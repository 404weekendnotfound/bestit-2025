from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session

from schemas import UserCreate, UserRead, JobCreate, JobRead, InterestCreate, InterestRead
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


@users_router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: int, session: Session = Depends(get_session)):
    """Endpoint do pobierania danych użytkownika po ID"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@users_router.get("/", response_model=List[UserRead])
def read_users(session: Session = Depends(get_session)):
    """Endpoint do pobierania wszystkich użytkowników"""
    users = session.exec(select(User)).all()
    return users


jobs_router = APIRouter(prefix="/jobs", tags=["jobs"])


@jobs_router.post("/", response_model=JobRead)
def create_job(job: JobCreate, session: Session = Depends(get_session)):
    """Endpoint do dodawania pracy"""
    # Sprawdź czy użytkownik istnieje
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
    # Sprawdź czy użytkownik istnieje
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
