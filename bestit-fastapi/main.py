import httpx
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import uuid
import pymupdf4llm
from database import create_db_and_tables
from router import users_router, jobs_router, education_router, certification_router, interests_router

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
app.include_router(education_router)
app.include_router(certification_router)
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

        # Try to send webhook with timeout
        webhook_status = "success"
        webhook_response_data = None
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://n8n.weekendnotfound.pl/webhook/cv-analyze",
                    json={
                        "filename": unique_filename,
                        "content": markdown_content
                    },
                    timeout=10.0  # Set 10 second timeout
                )
                if response.is_success:
                    webhook_response_data = response
                    webhook_status = "success"
                else:
                    webhook_status = f"failed with status code: {response.status_code}"
        except httpx.RequestError as e:
            webhook_status = f"failed with error: {str(e)}"

        # Zapisz wygenerowany markdown do pliku
        markdown_file = f"media/cv_uploads/{unique_filename}.md"
        with open(markdown_file, "w", encoding="utf-8") as md_file:
            md_file.write(markdown_content)

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
        "markdown_file": markdown_file,
        "markdown_preview": markdown_content[:200] + "..." if len(markdown_content) > 200 else markdown_content,
        "webhook_status": webhook_status,
        "webhook_response": webhook_response_data
    }

@app.get("/")
async def test():
    return {
        "Test": "test"
    }