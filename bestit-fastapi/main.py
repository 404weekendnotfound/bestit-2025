from fastapi import FastAPI, UploadFile, File, HTTPException
import os
import shutil

app = FastAPI()


@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    # Sprawdzenie typu pliku
    allowed_content_types = [
        "application/pdf",
        "image/jpeg", "image/png", "image/jpg"
    ]

    if file.content_type not in allowed_content_types:
        raise HTTPException(status_code=400, detail="Available file types: JPG, JPEG, PNG")

    # Utworzenie folderu na pliki CV, jeśli nie istnieje
    os.makedirs("media/cv_uploads", exist_ok=True)

    # Zapisywanie pliku
    file_location = f"media/cv_uploads/{file.filename}"
    with open(file_location, "wb") as buffer:
        # noinspection PyTypeChecker
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "status": "CV has been uploaded successfully"
    }
