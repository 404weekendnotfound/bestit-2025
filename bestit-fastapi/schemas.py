from datetime import date
from typing import Optional, List
from sqlmodel import SQLModel


class UserCreate(SQLModel):
    """Model do tworzenia nowego użytkownika"""
    first_name: str
    last_name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    age: Optional[int] = None


class UserRead(SQLModel):
    """Model do zwracania danych użytkownika"""
    id: int
    first_name: str
    last_name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    age: Optional[int] = None


class JobCreate(SQLModel):
    """Model do tworzenia nowej pracy"""
    position: str
    company: str
    start_date: date
    end_date: Optional[date] = None
    user_id: int


class JobRead(SQLModel):
    """Model do zwracania danych pracy"""
    id: int
    position: str
    company: str
    start_date: date
    end_date: Optional[date] = None
    user_id: int


class EducationCreate(SQLModel):
    """Model do tworzenia nowej ucznienia"""
    degree: str
    field: str
    institution: str
    graduation_date: date
    user_id: int


class EducationRead(SQLModel):
    """Model do zwracania danych ucznienia"""
    id: int
    degree: str
    field: str
    institution: str
    graduation_date: date
    user_id: int


class CertificateCreate(SQLModel):
    """Model do tworzenia certyfikatu"""
    name: str
    issuer: str
    date: date
    user_id: int


class CertificateRead(SQLModel):
    """Model do zwracania danych certyfikatu"""
    id: int
    name: str
    issuer: str
    date: date
    user_id: int


class InterestCreate(SQLModel):
    """Model do tworzenia zainteresowania"""
    interest: str
    user_id: int


class InterestRead(SQLModel):
    """Model do zwracania danych zainteresowania"""
    id: int
    interest: str
    user_id: int


class UserWithDetails(UserRead):
    """Model do zwracania użytkownika z powiązanymi danymi"""
    job_experience: List[JobRead] = []
    education: List[EducationRead] = []
    certificates: List[CertificateRead] = []
    interests: List[InterestRead] = []
