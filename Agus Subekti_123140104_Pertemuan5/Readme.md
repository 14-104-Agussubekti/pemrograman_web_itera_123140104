Sistem Manajemen Perpustakaan Sederhana (Python OOP)
Proyek ini adalah implementasi sistem manajemen perpustakaan sederhana menggunakan Python, yang dibuat sebagai pemenuhan tugas praktikum untuk mendemonstrasikan konsep-konsep Object-Oriented Programming (OOP).

Aplikasi ini berjalan di terminal (console) dan memungkinkan pengguna untuk mengelola inventaris item perpustakaan, seperti Buku dan Majalah, melalui menu interaktif.

🚀 Fitur Program
Sistem ini memiliki menu interaktif dengan fungsionalitas utama:

Menambahkan Item Baru:

Pengguna dapat memilih untuk menambahkan Buku (memerlukan ID, Judul, Penulis) atau Majalah (memerlukan ID, Judul, Edisi).

Sistem mencegah penambahan item dengan ID yang duplikat.

Menampilkan Daftar Item:

Menampilkan semua item (Buku dan Majalah) yang saat ini tersimpan di perpustakaan.

Fitur ini mendemonstrasikan polymorphism, karena metode display_info() yang berbeda dipanggil tergantung pada kelas objek (Buku atau Majalah).

Mencari Item:

Mencari dan menampilkan item berdasarkan ID (pencocokan penuh) atau Judul (pencocokan sebagian/parsial, case-insensitive).

Keluar:

Menghentikan eksekusi program.

💻 Screenshot Hasil Running Program
Berikut adalah tangkapan layar dari beberapa fungsionalitas utama program saat dijalankan.

<img width="639" height="113" alt="image" src="https://github.com/user-attachments/assets/c0f7b1a0-412e-4530-a770-e7d98d7733e9" />
<img width="283" height="194" alt="image" src="https://github.com/user-attachments/assets/951edda8-f435-43b7-bf2c-0b71c1b21b9f" />
<img width="353" height="234" alt="image" src="https://github.com/user-attachments/assets/1f93e1a4-41e6-4c63-9753-4defb9cc2553" />
<img width="286" height="109" alt="image" src="https://github.com/user-attachments/assets/1f5e4ff8-aa6e-4ab1-92df-17ca56578017" />




Diagram Class (Opsional, Nilai Tambah)
Diagram berikut menjelaskan struktur kelas, inheritance, dan relasi antar objek dalam sistem ini.

Code snippet

classDiagram
    direction TB
    
    class LibraryItem {
        <<abstract>>
        #_id_item: str
        #_judul: str
        +id_item: str (property)
        +judul: str (property)
        +display_info()*
    }

    class Book {
        -_penulis: str
        +display_info()
    }

    class Magazine {
        -_edisi: str
        +display_info()
    }

    class Library {
        -__items: list[LibraryItem]
        +tambah_item(item: LibraryItem)
        +tampilkan_item_tersedia()
        +cari_item(keyword: str)
    }

    ' Inheritance
    LibraryItem <|-- Book
    LibraryItem <|-- Magazine

    ' Composition Relationship
    Library "1" o-- "*" LibraryItem : "manages"

Penjelasan Diagram:
LibraryItem adalah abstract class yang menjadi induk (<|--) bagi Book dan Magazine.

Atribut dengan tanda # (_id_item) adalah protected.

Atribut dengan tanda - (__items) adalah private.

Metode display_info()* adalah metode abstract.

Library "mengelola" (o--) satu atau banyak objek LibraryItem.
