from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from schemas import UserCreate, UserRead, JobCreate, JobRead, EducationCreate, EducationRead, CertificateCreate, \
    CertificateRead, InterestCreate, InterestRead, UserWithDetails, UserUpdate
from models import User, Job, Education, Certificate, Interest
from database import get_session

users_router = APIRouter(prefix="/users", tags=["users"])


@users_router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    """Endpoint do tworzenia nowego użytkownika"""
    db_user = User(first_name=user.first_name,
                   last_name=user.last_name,
                   address=user.address,
                   phone=user.phone,
                   email=user.email,
                   linkedin=user.linkedin,
                   age=user.age)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@users_router.get("/{user_id}", response_model=UserWithDetails)
def read_user(user_id: int, session: Session = Depends(get_session)):
    """Endpoint do pobierania danych użytkownika po ID"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.job_experience = read_user_jobs(user_id, session)
    user.education = read_user_education(user_id, session)
    user.certificates = read_user_certificate(user_id, session)
    user.interests = read_user_interests(user_id, session)

    return user

@users_router.get("/email/{email}", response_model=UserWithDetails)
def read_user_by_email(email: str, session: Session = Depends(get_session)):
    """Endpoint do pobierania danych użytkownika po adresie email"""
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.job_experience = read_user_jobs(user.id, session)
    user.education = read_user_education(user.id, session)
    user.certificates = read_user_certificate(user.id, session)
    user.interests = read_user_interests(user.id, session)

    return user

@users_router.get("/", response_model=List[UserRead])
def read_users(session: Session = Depends(get_session)):
    """Endpoint do pobierania wszystkich użytkowników"""
    users = session.exec(select(User)).all()
    return users


@users_router.put("/{user_id}", response_model=UserWithDetails)
def update_user(user_id: int, user_data: UserUpdate, session: Session = Depends(get_session)):
    """Endpoint do aktualizacji danych użytkownika"""
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Użytkownik nie znaleziony")
    
    # Aktualizacja podstawowych danych użytkownika
    user_data_dict = user_data.dict(exclude={"job_experience", "education", "certificates", "interests"})
    for key, value in user_data_dict.items():
        setattr(db_user, key, value)
    
    # Aktualizacja doświadczenia zawodowego
    if user_data.job_experience:
        # Usuń istniejące wpisy
        statement = select(Job).where(Job.user_id == user_id)
        existing_jobs = session.exec(statement).all()
        for job in existing_jobs:
            session.delete(job)
        
        # Dodaj nowe wpisy
        for job_data in user_data.job_experience:
            new_job = Job(
                position=job_data.position,
                company=job_data.company,
                start_date=job_data.start_date,
                end_date=job_data.end_date,
                user_id=user_id
            )
            session.add(new_job)
    
    # Aktualizacja edukacji
    if user_data.education:
        # Usuń istniejące wpisy
        statement = select(Education).where(Education.user_id == user_id)
        existing_education = session.exec(statement).all()
        for edu in existing_education:
            session.delete(edu)
        
        # Dodaj nowe wpisy
        for edu_data in user_data.education:
            new_edu = Education(
                degree=edu_data.degree,
                field=edu_data.field,
                institution=edu_data.institution,
                graduation_date=edu_data.graduation_date,
                user_id=user_id
            )
            session.add(new_edu)
    
    # Aktualizacja certyfikatów
    if user_data.certificates:
        # Usuń istniejące wpisy
        statement = select(Certificate).where(Certificate.user_id == user_id)
        existing_certificates = session.exec(statement).all()
        for cert in existing_certificates:
            session.delete(cert)
        
        # Dodaj nowe wpisy
        for cert_data in user_data.certificates:
            new_cert = Certificate(
                name=cert_data.name,
                issuer=cert_data.issuer,
                issue_date=cert_data.issue_date,
                user_id=user_id
            )
            session.add(new_cert)
    
    # Aktualizacja zainteresowań
    if user_data.interests:
        # Usuń istniejące wpisy
        statement = select(Interest).where(Interest.user_id == user_id)
        existing_interests = session.exec(statement).all()
        for interest in existing_interests:
            session.delete(interest)
        
        # Dodaj nowe wpisy
        for interest_data in user_data.interests:
            new_interest = Interest(
                interest=interest_data.interest,
                user_id=user_id
            )
            session.add(new_interest)
    
    session.commit()
    session.refresh(db_user)
    
    # Pobierz zaktualizowane dane
    db_user.job_experience = read_user_jobs(user_id, session)
    db_user.education = read_user_education(user_id, session)
    db_user.certificates = read_user_certificate(user_id, session)
    db_user.interests = read_user_interests(user_id, session)
    
    return db_user


@users_router.put("/email/{email}", response_model=UserWithDetails)
def update_user_by_email(email: str, user_data: UserUpdate, session: Session = Depends(get_session)):
    """Endpoint do aktualizacji danych użytkownika po adresie email"""
    statement = select(User).where(User.email == email)
    db_user = session.exec(statement).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Użytkownik nie znaleziony")
    
    user_id = db_user.id
    
    # Aktualizacja podstawowych danych użytkownika
    user_data_dict = user_data.dict(exclude={"job_experience", "education", "certificates", "interests"})
    for key, value in user_data_dict.items():
        setattr(db_user, key, value)
    
    # Aktualizacja doświadczenia zawodowego
    if user_data.job_experience:
        # Usuń istniejące wpisy
        statement = select(Job).where(Job.user_id == user_id)
        existing_jobs = session.exec(statement).all()
        for job in existing_jobs:
            session.delete(job)
        
        # Dodaj nowe wpisy
        for job_data in user_data.job_experience:
            new_job = Job(
                position=job_data.position,
                company=job_data.company,
                start_date=job_data.start_date,
                end_date=job_data.end_date,
                user_id=user_id
            )
            session.add(new_job)
    
    # Aktualizacja edukacji
    if user_data.education:
        # Usuń istniejące wpisy
        statement = select(Education).where(Education.user_id == user_id)
        existing_education = session.exec(statement).all()
        for edu in existing_education:
            session.delete(edu)
        
        # Dodaj nowe wpisy
        for edu_data in user_data.education:
            new_edu = Education(
                degree=edu_data.degree,
                field=edu_data.field,
                institution=edu_data.institution,
                graduation_date=edu_data.graduation_date,
                user_id=user_id
            )
            session.add(new_edu)
    
    # Aktualizacja certyfikatów
    if user_data.certificates:
        # Usuń istniejące wpisy
        statement = select(Certificate).where(Certificate.user_id == user_id)
        existing_certificates = session.exec(statement).all()
        for cert in existing_certificates:
            session.delete(cert)
        
        # Dodaj nowe wpisy
        for cert_data in user_data.certificates:
            new_cert = Certificate(
                name=cert_data.name,
                issuer=cert_data.issuer,
                issue_date=cert_data.issue_date,
                user_id=user_id
            )
            session.add(new_cert)
    
    # Aktualizacja zainteresowań
    if user_data.interests:
        # Usuń istniejące wpisy
        statement = select(Interest).where(Interest.user_id == user_id)
        existing_interests = session.exec(statement).all()
        for interest in existing_interests:
            session.delete(interest)
        
        # Dodaj nowe wpisy
        for interest_data in user_data.interests:
            new_interest = Interest(
                interest=interest_data.interest,
                user_id=user_id
            )
            session.add(new_interest)
    
    session.commit()
    session.refresh(db_user)
    
    # Pobierz zaktualizowane dane
    db_user.job_experience = read_user_jobs(user_id, session)
    db_user.education = read_user_education(user_id, session)
    db_user.certificates = read_user_certificate(user_id, session)
    db_user.interests = read_user_interests(user_id, session)
    
    return db_user


jobs_router = APIRouter(prefix="/jobs", tags=["jobs"])


@jobs_router.post("/", response_model=JobRead)
def create_job(job: JobCreate, session: Session = Depends(get_session)):
    """Endpoint do dodawania pracy"""
    user = session.get(User, job.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_job = Job(
        position=job.position,
        company=job.company,
        start_date=job.start_date,
        end_date=job.end_date,
        user_id=job.user_id
    )
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    return db_job


@jobs_router.get("/user/{user_id}", response_model=List[JobRead])
def read_user_jobs(user_id: int, session: Session = Depends(get_session)):
    """Endpoint do pobierania historii pracy użytkownika"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    statement = select(Job).where(Job.user_id == user_id)
    jobs = session.exec(statement).all()
    return jobs


interests_router = APIRouter(prefix="/interests", tags=["interests"])


@interests_router.post("/", response_model=InterestRead)
def create_interest(interest: InterestCreate, session: Session = Depends(get_session)):
    """Endpoint do dodawania zainteresowania"""
    user = session.get(User, interest.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_interests = Interest(
        interest=interest.interest,
        user_id=interest.user_id
    )
    session.add(db_interests)
    session.commit()
    session.refresh(db_interests)
    return db_interests


@interests_router.get("/user/{user_id}", response_model=List[InterestRead])
def read_user_interests(user_id: int, session: Session = Depends(get_session)):
    """Endpoint do pobierania zainteresowań użytkownika"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    statement = select(Interest).where(Interest.user_id == user_id)
    interests = session.exec(statement).all()
    return interests


education_router = APIRouter(prefix="/education", tags=["education"])


@education_router.post("/", response_model=EducationRead)
def create_education(education: EducationCreate, session: Session = Depends(get_session)):
    user = session.get(User, education.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_education = Education(
        degree=education.degree,
        field=education.field,
        institution=education.institution,
        graduation_date=education.graduation_date,
        user_id=education.user_id
    )
    session.add(db_education)
    session.commit()
    session.refresh(db_education)
    return db_education


@education_router.get("/user/{user_id}", response_model=List[EducationRead])
def read_user_education(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    statement = select(Education).where(Education.user_id == user_id)
    education = session.exec(statement).all()
    return education


certification_router = APIRouter(prefix="/certification", tags=["certification"])


@certification_router.post("/", response_model=CertificateRead)
def create_certificate(certificate: CertificateCreate, session: Session = Depends(get_session)):
    user = session.get(User, certificate.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_certificate = Certificate(
        name=certificate.name,
        issuer=certificate.issuer,
        issue_date=certificate.issue_date,
        user_id=certificate.user_id
    )
    session.add(db_certificate)
    session.commit()
    session.refresh(db_certificate)
    return db_certificate


@certification_router.get("/user/{user_id}", response_model=List[CertificateRead])
def read_user_certificate(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    statement = select(Certificate).where(Certificate.user_id == user_id)
    certificate = session.exec(statement).all()
    return certificate
