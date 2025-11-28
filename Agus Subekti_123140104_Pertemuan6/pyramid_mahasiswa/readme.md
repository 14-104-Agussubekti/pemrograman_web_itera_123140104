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

### 1. Create Data

``` bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "TEST01", "nama_mk": "Testing API", "sks": 2, "semester": 1}'
```

### 2. Get All Data

``` bash
curl http://localhost:6543/api/matakuliah
```

### 3. Get One Data

``` bash
curl http://localhost:6543/api/matakuliah/1
```

### 4. Update Data

``` bash
curl -X PUT http://localhost:6543/api/matakuliah/1 -H "Content-Type: application/json" -d '{"nama_mk": "Testing API Updated"}'
```

### 5. Delete Data

``` bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```
