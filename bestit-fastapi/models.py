from datetime import date
from typing import Optional, List
from sqlalchemy.orm import Relationship
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str = Field(index=True)
    last_name: str = Field(index=True)
    address: str | None = Field(default=None, index=True)
    phone: str | None = Field(default=None, index=True)
    email: str | None = Field(default=None, index=True)
    linkedin: str | None = Field(default=None, index=True)
    age: int | None = Field(default=None, index=True)

    job_experience: Optional[List["Job"]] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"})
    interests: Optional[List["Interest"]] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"})
    education: Optional[List["Education"]] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"})
    certificates: Optional[List["Certificate"]] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"})


class Job(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    position: str = Field(index=True)
    company: str = Field(index=True)
    start_date: date = Field(index=True)
    end_date: Optional[date] = Field(default=None, index=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    user: Optional[User] = Relationship(back_populates="job_experience")


class Education(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    degree: str = Field(index=True)
    field: str = Field(index=True)
    institution: str = Field(index=True)
    graduation_date: date = Field(index=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    user: Optional[User] = Relationship(back_populates="education")


class Certificate(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    issuer: str = Field(index=True)
    date: date = Field(index=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    user: Optional[User] = Relationship(back_populates="certificates")


class Interest(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    interest: str = Field(index=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    user: Optional[User] = Relationship(back_populates="interests")

