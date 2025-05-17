import requests
from fastapi import FastAPI, UploadFile, File, HTTPException, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import uuid
import pymupdf4llm
from sqlmodel import Session
from database import create_db_and_tables, get_session
from router import users_router, jobs_router, education_router, certification_router, interests_router
from models import User, Job, Education, Certificate, Interest
from datetime import datetime, date

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


ALLOWED_TYPES = {"application/pdf"}  # add images here if you re-enable them
CV_DIR = "media/cv_uploads"
os.makedirs(CV_DIR, exist_ok=True)


@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...), session: Session = Depends(get_session)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Available file types: PDF"  # update if you widen support
        )

    filename = f"{uuid.uuid4()}.{file.filename.split('.')[-1]}"
    dst = os.path.join(CV_DIR, filename)
    with open(dst, "wb") as buffer:
        # noinspection PyTypeChecker
        shutil.copyfileobj(file.file, buffer)

    try:
        markdown = pymupdf4llm.to_markdown(dst)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to convert PDF to markdown: {e}"
        )

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

    try:
        data = r.json()  # succeeds if Content-Type is JSON

        # Zapisz dane CV do bazy danych
        user_id = None
        try:
            # Tworzenie użytkownika
            user = User(
                first_name=data.get("first_name", ""),
                last_name=data.get("last_name", ""),
                address=data.get("address"),
                phone=data.get("phone"),
                email=data.get("email"),
                linkedin=data.get("linkedin"),
                age=data.get("age")
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            user_id = user.id

            # Dodawanie doświadczenia zawodowego
            for job_data in data.get("work_experience", []):
                job = Job(
                    position=job_data.get("position", ""),
                    company=job_data.get("company", ""),
                    start_date=job_data.get("start_date", ""),
                    end_date=job_data.get("end_date", ""),
                    user_id=user.id
                )
                session.add(job)

            # Dodawanie wykształcenia
            for edu_data in data.get("education", []):
                education = Education(
                    degree=edu_data.get("degree", ""),
                    field=edu_data.get("field", ""),
                    institution=edu_data.get("institution", ""),
                    graduation_date=edu_data.get("graduation_date", ""),
                    user_id=user.id
                )
                session.add(education)

            # Dodawanie certyfikatów
            for cert_data in data.get("certifications", []):
                certificate = Certificate(
                    name=cert_data.get("name", ""),
                    issuer=cert_data.get("issuer", ""),
                    issue_date=cert_data.get("date", ""),
                    user_id=user.id
                )
                session.add(certificate)

            # Dodawanie zainteresowań
            for interest_name in data.get("interests", []):
                interest = Interest(
                    interest=interest_name,
                    user_id=user.id
                )
                session.add(interest)

            session.commit()
            data["user_id"] = user_id  # Dodaj ID użytkownika do odpowiedzi

        except Exception as e:
            session.rollback()
            # Nie przerywamy przetwarzania, tylko logujemy błąd
            data["db_error"] = str(e)

        return data  # FastAPI returns it as JSON
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
