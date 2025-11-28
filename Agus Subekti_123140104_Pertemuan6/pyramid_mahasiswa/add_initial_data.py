"""
Script untuk menambahkan data awal matakuliah
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from mk_api.models.meta import Base
from mk_api.models.matakuliah import Matakuliah

# Konfigurasi database (sesuaikan dengan development.ini)
DATABASE_URL = "postgresql+psycopg2://postgres:asubek@localhost:5432/mk_db"

# Buat engine dan session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

try:
    # Data awal 3 matakuliah
    matakuliahs = [
        Matakuliah(
            kode_mk='MK001',
            nama_mk='Pemrograman Python',
            sks=3,
            semester=1
        ),
        Matakuliah(
            kode_mk='MK002',
            nama_mk='Struktur Data',
            sks=4,
            semester=2
        ),
        Matakuliah(
            kode_mk='MK003',
            nama_mk='Basis Data',
            sks=3,
            semester=3
        )
    ]
    
    # Tambahkan ke session
    session.add_all(matakuliahs)
    session.commit()
    
    print("✅ Berhasil menambahkan 3 data matakuliah awal:")
    for mk in matakuliahs:
        print(f"   - {mk.kode_mk}: {mk.nama_mk} ({mk.sks} SKS, Semester {mk.semester})")
        
except Exception as e:
    session.rollback()
    print(f"❌ Error: {str(e)}")
finally:
    session.close()
