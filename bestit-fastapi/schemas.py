from typing import Optional, List
from sqlmodel import SQLModel


class UserCreate(SQLModel):
    """Scheme to create a user"""
    first_name: str
    last_name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    age: Optional[int] = None


class UserRead(SQLModel):
    """Scheme to read user"""
    id: int
    first_name: str
    last_name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    age: Optional[int] = None


class JobCreate(SQLModel):
    """Scheme to create job experience"""
    position: str
    company: str
    start_date: str
    end_date: Optional[str] = None
    user_id: int


class JobRead(SQLModel):
    """Scheme to read job experience"""
    id: int
    position: str
    company: str
    start_date: str
    end_date: Optional[str] = None
    user_id: int


class EducationCreate(SQLModel):
    """Scheme to create user's education"""
    degree: str
    field: str
    institution: str
    graduation_date: str
    user_id: int


class EducationRead(SQLModel):
    """Scheme to read user's education"""
    id: int
    degree: str
    field: str
    institution: str
    graduation_date: str
    user_id: int


class CertificateCreate(SQLModel):
    """Scheme to create user's certification"""
    name: str
    issuer: str
    issue_date: str
    user_id: int


class CertificateRead(SQLModel):
    """Scheme to read user's certification"""
    id: int
    name: str
    issuer: str
    issue_date: str
    user_id: int


class InterestCreate(SQLModel):
    """Scheme to create user's interests"""
    interest: str
    user_id: int


class InterestRead(SQLModel):
    """Scheme to read user's interests"""
    id: int
    interest: str
    user_id: int


class UserWithDetails(UserRead):
    """Scheme to read user with details"""
    job_experience: List[JobRead] = []
    education: List[EducationRead] = []
    certificates: List[CertificateRead] = []
    interests: List[InterestRead] = []


class UserUpdate(UserWithDetails):
    """Schemat do aktualizacji użytkownika wraz ze wszystkimi szczegółami"""
    pass
