import requests
from fastapi import FastAPI, UploadFile, File, HTTPException, Response
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

ALLOWED_TYPES = {"application/pdf"}          # add images here if you re-enable them
CV_DIR = "media/cv_uploads"
os.makedirs(CV_DIR, exist_ok=True) 

@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    # ---- 1. quick file-type gate ------------------------------------------------
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Available file types: PDF"            # update if you widen support
        )

    # ---- 2. save the file -------------------------------------------------------
    filename = f"{uuid.uuid4()}.{file.filename.split('.')[-1]}"
    dst = os.path.join(CV_DIR, filename)
    with open(dst, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ---- 3. turn PDF → markdown -------------------------------------------------
    try:
        markdown = pymupdf4llm.to_markdown(dst)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to convert PDF to markdown: {e}"
        )

    # ---- 4. call n8n and relay its answer --------------------------------------
    try:
        r = requests.post(
            "https://n8n.weekendnotfound.pl/webhook/cv-analyze",
            json={"content": markdown},
            timeout=60,
        )
        r.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Webhook call failed: {e}"
        )

    # Prefer JSON if available, fall back to raw text
    try:
        data = r.json()                       # succeeds if Content-Type is JSON
        return data                           # FastAPI returns it as JSON
    except ValueError:
        return Response(
            content=r.text,
            media_type=r.headers.get("content-type", "text/plain"),
            status_code=r.status_code,
        )

@app.get("/")
async def test():
    return {
        "Test": "test"
    }