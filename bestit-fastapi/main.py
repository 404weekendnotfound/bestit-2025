import requests
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import uuid
import pymupdf4llm
from database import create_db_and_tables
from router import users_router, jobs_router, interests_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(users_router)
app.include_router(jobs_router)
app.include_router(interests_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    # Sprawdzenie typu pliku
    allowed_content_types = [
        "application/pdf"  # ,
        # "image/jpeg", "image/png", "image/jpg"
    ]

    if file.content_type not in allowed_content_types:
        raise HTTPException(status_code=400, detail="Available file types: PDF, JPG, JPEG, PNG")

    # Generowanie unikalnej nazwy pliku
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    # Utworzenie folderu na pliki CV, jeśli nie istnieje
    os.makedirs("media/cv_uploads", exist_ok=True)

    # Zapisywanie pliku
    file_location = f"media/cv_uploads/{unique_filename}"
    with open(file_location, "wb") as buffer:
        # noinspection PyTypeChecker
        shutil.copyfileobj(file.file, buffer)

    try:
        markdown_content = pymupdf4llm.to_markdown(file_location)

        # Make the webhook request
        req = requests.post("https://n8n.weekendnotfound.pl/webhook/cv-analyze", 
                          json={"content": markdown_content},
                          timeout=60)  # 60 seconds timeout
        
        # Ensure we got a successful response
        req.raise_for_status()
        
        # Log the raw response for debugging
        print(f"Raw webhook response: {req.text}")
        print(f"Response content type: {req.headers.get('content-type', 'not specified')}")
        
        try:
            # Check if response is empty
            if not req.text.strip():
                return {
                    "original_filename": file.filename,
                    "saved_as": unique_filename,
                    "content_type": file.content_type,
                    "status": "CV uploaded but received empty response from webhook",
                    "raw_response": req.text,
                    "response_status": req.status_code
                }
            
            webhook_response = req.json()  # Parse JSON response
            
            # Validate webhook response structure
            if not isinstance(webhook_response, (list, dict)):
                raise ValueError(f"Unexpected response type: {type(webhook_response)}")
            
            # Extract CV data based on response structure
            cv_data = webhook_response[0] if isinstance(webhook_response, list) else webhook_response
            
        except ValueError as json_err:
            # If JSON parsing fails, return detailed error information
            return {
                "original_filename": file.filename,
                "saved_as": unique_filename,
                "content_type": file.content_type,
                "status": "CV uploaded but webhook response parsing failed",
                "error": str(json_err),
                "raw_response": req.text,
                "response_content_type": req.headers.get('content-type', 'not specified'),
                "response_status": req.status_code
            }
        except requests.RequestException as req_err:
            return {
                "original_filename": file.filename,
                "saved_as": unique_filename,
                "content_type": file.content_type,
                "status": "CV uploaded but webhook request failed",
                "error": str(req_err),
                "response_status": getattr(req_err.response, 'status_code', None)
            }

    except Exception as e:
        return {
            "original_filename": file.filename,
            "saved_as": unique_filename,
            "content_type": file.content_type,
            "status": "CV has been uploaded successfully, but conversion to markdown failed",
            "error": str(e)
        }

    return {
        "original_filename": file.filename,
        "saved_as": unique_filename,
        "content_type": file.content_type,
        "status": "CV has been uploaded and converted to markdown successfully",
        "markdown_preview": markdown_content[:200] + "..." if len(markdown_content) > 200 else markdown_content,
        "webhook_response": cv_data
    }

@app.get("/")
async def test():
    return {
        "Test": "test"
    }