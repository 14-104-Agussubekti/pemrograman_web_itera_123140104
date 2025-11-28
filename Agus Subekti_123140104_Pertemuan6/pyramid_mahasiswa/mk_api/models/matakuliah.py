from typing import Optional
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from .meta import Base

class Matakuliah(Base):
    __tablename__ = 'matakuliah'

    # SQLAlchemy 2.0 Mapped Syntax
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kode_mk: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    nama_mk: Mapped[str] = mapped_column(String(100), nullable=False)
    sks: Mapped[int] = mapped_column(Integer, nullable=False)
    semester: Mapped[int] = mapped_column(Integer, nullable=False)

    def to_dict(self) -> dict:
        """Serialisasi object ke dictionary/JSON"""
        return {
            "id": self.id,
            "kode_mk": self.kode_mk,
            "nama_mk": self.nama_mk,
            "sks": self.sks,
            "semester": self.semester
        }