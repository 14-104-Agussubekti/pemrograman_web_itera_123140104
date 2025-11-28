# Aplikasi API Manajemen Matakuliah

Aplikasi Backend REST API sederhana untuk memanajemen data matakuliah.
Aplikasi ini dibangun menggunakan **Pyramid Framework** dan **SQLAlchemy
2.0** dengan database **PostgreSQL**.

## Deskripsi Proyek

Proyek ini dibuat untuk memenuhi tugas praktikum "Aplikasi API Manajemen
Matakuliah". Aplikasi ini menyediakan layanan CRUD (Create, Read,
Update, Delete) data matakuliah dengan spesifikasi teknologi modern: -
**Language**: Python 3.10+ - **Framework**: Pyramid (Latest Stable) -
**Database**: PostgreSQL - **ORM**: SQLAlchemy 2.0 (Strict Mapped
Style) - **Migration**: Alembic

------------------------------------------------------------------------

## Cara Instalasi

Ikuti langkah-langkah berikut untuk menyiapkan lingkungan pengembangan
di komputer lokal.

### 1. Membuat Virtual Environment

Pastikan Python 3.10+ sudah terinstall. Buka terminal (Git Bash) dan
jalankan:

``` bash
# Buat folder environment
python -m venv venv

# Aktifkan environment (Windows Git Bash)
source venv/Scripts/activate

# Update pip
python -m pip install --upgrade pip
```

### 2. Instalasi Dependensi

Install aplikasi dan seluruh library yang dibutuhkan dalam mode
editable:

``` bash
pip install -e .
```

### 3. Konfigurasi Database

**Buat Database**: Pastikan PostgreSQL berjalan, lalu buat database baru
bernama `mk_db`.

``` bash
createdb -U postgres mk_db
```

**Edit development.ini**: Sesuaikan baris berikut:

``` toml
sqlalchemy.url = postgresql+psycopg2://postgres:password_anda@localhost:5432/mk_db
```

**Edit alembic.ini**: Pastikan baris `sqlalchemy.url` sama persis dengan
yang ada di `development.ini`.

------------------------------------------------------------------------

## Cara Menjalankan

### 1. Menjalankan Migrasi Database

``` bash
alembic upgrade head
```

### 2. Menjalankan Server

``` bash
pserve development.ini
```

Server berjalan di: **http://localhost:6543**

------------------------------------------------------------------------

## API Endpoints

### 1. List Semua Matakuliah

**Method:** GET\
**URL:** `/api/matakuliah`

**Response:**

``` json
[
    {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Algoritma Dasar",
        "sks": 3,
        "semester": 1
    }
]
```

### 2. Detail Matakuliah

**Method:** GET\
**URL:** `/api/matakuliah/{id}`

### 3. Tambah Matakuliah

**Method:** POST\
**URL:** `/api/matakuliah`

**Body:**

``` json
{
    "kode_mk": "IF202",
    "nama_mk": "Struktur Data",
    "sks": 4,
    "semester": 2
}
```

### 4. Update Matakuliah

**Method:** PUT\
**URL:** `/api/matakuliah/{id}`

**Body:**

``` json
{
    "nama_mk": "Struktur Data Lanjut",
    "sks": 4
}
```

### 5. Hapus Matakuliah

**Method:** DELETE\
**URL:** `/api/matakuliah/{id}`

Response: **204 No Content**

------------------------------------------------------------------------

## Testing (cURL)
<img width="603" height="385" alt="Screenshot 2025-11-28 191124" src="https://github.com/user-attachments/assets/62888285-48b9-47d4-9f4a-9a417752ab11" />


<img width="604" height="173" alt="Screenshot 2025-11-28 191139" src="https://github.com/user-attachments/assets/c5f82db7-73de-4462-9e36-9a8441acb053" />


<img width="598" height="199" alt="Screenshot 2025-11-28 191153" src="https://github.com/user-attachments/assets/2b090a48-be56-4d66-8c9c-4fd4e665a892" />


<img width="599" height="211" alt="Screenshot 2025-11-28 191206" src="https://github.com/user-attachments/assets/731b5123-c3e0-4468-8884-47e7a20233b4" />


<img width="595" height="263" alt="Screenshot 2025-11-28 191250" src="https://github.com/user-attachments/assets/7adc66cc-cfc9-4dc7-b44a-0b07ca9ac1f3" />


<img width="659" height="404" alt="Screenshot 2025-11-28 191329" src="https://github.com/user-attachments/assets/41462cbc-099b-4c14-898e-17f6b2cb0103" />
