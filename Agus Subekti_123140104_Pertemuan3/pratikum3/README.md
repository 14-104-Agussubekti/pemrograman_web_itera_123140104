# 📖 Aplikasi Manajemen Buku Pribadi

Aplikasi web berbasis React yang dibuat sebagai tugas praktikum. Aplikasi ini memungkinkan pengguna untuk melacak koleksi buku pribadi mereka, mencatat buku yang ingin dibeli, sedang dibaca, atau sudah dimiliki.

Aplikasi ini menggunakan desain "Kartu" yang interaktif dengan palet warna Teal/Mint yang modern dan ramah dipandang.

## 2. Fitur Utama

* **Manajemen Buku (CRUD):** Tambah, Edit, dan Hapus data buku.
* **Filter & Pencarian:**
    * Filter daftar buku berdasarkan status (Ingin Dibeli, Sudah Dimiliki, Sedang Dibaca).
    * Cari buku secara *real-time* berdasarkan Judul atau Penulis.
* **Halaman Statistik:** Lihat ringkasan koleksi (Total buku, jumlah per status).
* **Penyimpanan Lokal:** Data buku Anda tersimpan aman di `localStorage` peramban, sehingga tidak hilang saat di-refresh.
* **Validasi Form:** Form memastikan Judul dan Penulis tidak boleh kosong.
* **Desain Interaktif:** Efek *hover* dan *focus* yang halus untuk pengalaman pengguna yang lebih baik.

## 3. Tampilan Antarmuka (Screenshot)

#### Halaman Utama (Daftar & Form)

Di halaman ini, pengguna dapat menambah, melihat, memfilter, mengedit, dan menghapus buku.

![Screenshot Halaman Utama]([TEMPATKAN SCREENSHOT HALAMAN UTAMA ANDA DI SINI])
*(Petunjuk: Ambil screenshot setelah Anda menambahkan beberapa buku untuk menunjukkan daftar, filter, dan form.)*

---

#### Halaman Statistik

Halaman ini menampilkan ringkasan data dari koleksi buku.

![Screenshot Halaman Statistik]([TEMPATKAN SCREENSHOT HALAMAN STATISTIK ANDA DI SINI])
*(Petunjuk: Ambil screenshot halaman Statistik setelah data ditambahkan.)*

## 4. Teknologi yang Digunakan

* **React 18** (Library UI)
* **Vite** (Build Tool)
* **React Hooks** (useState, useEffect, useMemo, useContext)
* **Context API** (Manajemen State Global)
* **CSS Murni** (Styling)
* **Vitest** (Testing Framework)
* **React Testing Library (RTL)** (Testing Utility)
* **@testing-library/user-event** (Simulasi Interaksi Pengguna)

## 5. Instruksi Instalasi dan Menjalankan

### Prasyarat

Pastikan Anda memiliki [Node.js](https://nodejs.org/) (termasuk `npm`) yang terinstal di komputer Anda.

### Langkah-langkah

1.  **Clone atau Unduh Repositori**
    ```bash
    git clone https://[URL_REPO_ANDA].git
    # atau unduh file ZIP dan ekstrak
    ```

2.  **Masuk ke Direktori Proyek**
    ```bash
    cd pratikum3
    ```

3.  **Instal Dependensi**
    Jalankan perintah ini untuk menginstal semua paket yang diperlukan.
    ```bash
    npm install
    ```

4.  **Jalankan Aplikasi (Mode Development)**
    Perintah ini akan menjalankan aplikasi di server lokal (biasanya `http://localhost:5173`).
    ```bash
    npm run dev
    ```

## 6. Menjalankan Tes & Laporan

Proyek ini dilengkapi dengan 6 unit test untuk memvalidasi fungsionalitas inti.

1.  **Menjalankan Tes**
    Untuk menjalankan tes di terminal, gunakan perintah:
    ```bash
    npm run test
    ```

2.  **Laporan Hasil Testing (Screenshot)**
    Semua 6 tes (termasuk validasi form, penambahan, penghapusan, filter, dan halaman statistik) berhasil lolos.

![Screenshot Hasil Tes]([TEMPATKAN SCREENSHOT HASIL TES DARI TERMINAL ANDA DI SINI])
*(Petunjuk: Ambil screenshot terminal Anda setelah `npm run test` selesai dan menunjukkan semua tes "PASS".)*

## 7. Penjelasan Fitur React & Struktur Kode

### Struktur Folder

Struktur proyek ini memisahkan *concerns* (urusan) untuk keterbacaan:

* `src/components`: Komponen UI yang *reusable* (BookForm, BookList, dll.).
* `src/context`: Berisi `BookContext.jsx` untuk manajemen state global.
* `src/hooks`: Berisi *custom hooks* untuk logika *reusable* (`useLocalStorage.js`, `useBookStats.js`).
* `src/pages`: Komponen yang bertindak sebagai "halaman" (HomePage, StatsPage).

### Penjelasan Fitur React Utama

#### 1. Context API (`src/context/BookContext.jsx`)
Digunakan untuk manajemen state global. Daripada melempar *props* (disebut *prop drilling*), `BookProvider` membungkus aplikasi dan menyediakan data `books` beserta fungsi (`addBook`, `deleteBook`, `updateBook`) ke komponen manapun yang membutuhkannya melalui *hook* `useBooks()`.

#### 2. Custom Hooks (`src/hooks/`)

* **`useLocalStorage.js`**: Ini adalah *hook* kustom yang paling penting. Ia membungkus `useState` dan `useEffect`.
    1.  Saat inisialisasi, ia mencoba membaca data dari `localStorage`.
    2.  Ia mengembalikan *state* (`storedValue`) dan *setter* (`setStoredValue`), persis seperti `useState`.
    3.  Sebuah `useEffect` di dalamnya otomatis berjalan setiap kali `storedValue` berubah, dan langsung menyimpannya ke `localStorage`.
    *Ini membuat sinkronisasi state dengan localStorage menjadi otomatis.*

* **`useBookStats.js`**: *Hook* ini menerima daftar `books` dan menggunakan `useMemo` untuk menghitung statistik (total, jumlah per status). `useMemo` memastikan bahwa kalkulasi berat ini hanya berjalan kembali jika daftar `books` benar-benar berubah, bukan di setiap render.
