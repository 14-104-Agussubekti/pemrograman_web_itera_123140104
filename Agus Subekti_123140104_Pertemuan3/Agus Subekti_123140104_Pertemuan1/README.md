# Student Task Manager

Aplikasi manajemen tugas mahasiswa yang dirancang untuk membantu mahasiswa mengelola tugas akademik mereka dengan efisien. Aplikasi ini dibangun menggunakan HTML, CSS, dan JavaScript murni tanpa framework eksternal.

## Fitur-Fitur Utama

### 1. **CRUD Operations (Create, Read, Update, Delete)**
- **Tambah Tugas**: Tambahkan tugas baru dengan nama, mata kuliah, deadline, dan deskripsi
- **Lihat Tugas**: Tampilkan semua tugas dalam format kartu yang rapi dan terorganisir
- **Edit Tugas**: Ubah detail tugas yang sudah ada
- **Hapus Tugas**: Hapus tugas yang tidak diperlukan dengan konfirmasi

### 2. **Validasi Form**
- Validasi nama tugas (minimal 3 karakter, maksimal 100 karakter)
- Validasi mata kuliah (minimal 3 karakter)
- Validasi deadline (tidak boleh di masa lalu)
- Pesan error yang jelas dan informatif untuk setiap field

### 3. **Manajemen Status Tugas**
- **Pending**: Tugas yang belum selesai dan deadline masih berlaku
- **Completed**: Tugas yang sudah ditandai selesai
- **Overdue**: Tugas yang melewati deadline

### 4. **Pencarian dan Filter**
- Pencarian real-time berdasarkan nama tugas atau mata kuliah
- Filter berdasarkan status (Pending, Selesai, Overdue)
- Filter berdasarkan mata kuliah
- Kombinasi filter untuk pencarian yang lebih spesifik

### 5. **Statistik Real-Time**
- Total jumlah tugas
- Jumlah tugas yang selesai
- Jumlah tugas pending
- Jumlah tugas overdue

### 6. **Penyimpanan Data Persisten**
- Semua data disimpan di localStorage browser
- Data tetap tersimpan meskipun browser ditutup
- Tidak memerlukan server atau database eksternal

### 7. **Desain Responsif**
- Tampilan optimal di desktop, tablet, dan mobile
- Interface yang user-friendly dan intuitif
- Animasi dan transisi yang smooth

## Penjelasan Teknis

### localStorage Implementation

**Konsep:**
localStorage adalah API browser yang memungkinkan penyimpanan data secara lokal di sisi klien. Data disimpan dalam format key-value dan persisten hingga dihapus secara manual.

**Implementasi dalam Aplikasi:**

\`\`\`javascript
// Menyimpan tugas ke localStorage
saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

// Memuat tugas dari localStorage
loadTasks() {
    const stored = localStorage.getItem('tasks');
    this.tasks = stored ? JSON.parse(stored) : [];
}
\`\`\`

**Keuntungan:**
- Data tidak hilang saat refresh halaman
- Tidak memerlukan koneksi internet
- Performa cepat karena data disimpan lokal
- Kapasitas hingga 5-10MB per domain

**Keterbatasan:**
- Data hanya tersimpan di browser yang sama
- Tidak bisa diakses dari device lain
- Dihapus jika cache browser dihapus

### Form Validation

**Strategi Validasi:**

1. **Client-Side Validation**
   - Dilakukan di browser sebelum data disimpan
   - Memberikan feedback langsung kepada user
   - Mengurangi beban server

2. **Validasi Fields:**

\`\`\`javascript
validateForm() {
    // Validasi nama tugas
    if (!taskName) {
        errors.taskName = 'Nama tugas tidak boleh kosong';
    } else if (taskName.length < 3) {
        errors.taskName = 'Nama tugas minimal 3 karakter';
    }

    // Validasi mata kuliah
    if (!subject) {
        errors.subject = 'Mata kuliah tidak boleh kosong';
    }

    // Validasi deadline
    if (!deadline) {
        errors.deadline = 'Deadline tidak boleh kosong';
    } else {
        const selectedDate = new Date(deadline);
        const today = new Date();
        if (selectedDate < today) {
            errors.deadline = 'Deadline tidak boleh di masa lalu';
        }
    }
}
\`\`\`

3. **Error Display**
   - Pesan error ditampilkan di bawah setiap field
   - Warna merah untuk menunjukkan error
   - Pesan yang jelas dan actionable

4. **Keamanan:**
   - HTML escaping untuk mencegah XSS attacks
   - Trim whitespace untuk input yang bersih
   - Validasi tipe data

## Daftar Fitur yang Telah Diimplementasikan

### Core Features
- [x] Tambah tugas baru dengan form validation
- [x] Tampilkan daftar tugas dalam format kartu
- [x] Edit tugas yang sudah ada
- [x] Hapus tugas dengan konfirmasi
- [x] Tandai tugas sebagai selesai/belum selesai

### Data Management
- [x] Penyimpanan data ke localStorage
- [x] Pemuatan data dari localStorage saat aplikasi dimulai
- [x] Sinkronisasi data real-time

### Filtering & Search
- [x] Pencarian tugas berdasarkan nama atau mata kuliah
- [x] Filter berdasarkan status (Pending, Selesai, Overdue)
- [x] Filter berdasarkan mata kuliah
- [x] Kombinasi multiple filters

### Validation
- [x] Validasi nama tugas (panjang minimal dan maksimal)
- [x] Validasi mata kuliah
- [x] Validasi deadline (tidak boleh di masa lalu)
- [x] Pesan error yang informatif
- [x] HTML escaping untuk keamanan

### Statistics & Status
- [x] Hitung total tugas
- [x] Hitung tugas yang selesai
- [x] Hitung tugas pending
- [x] Hitung tugas overdue
- [x] Deteksi otomatis status overdue

### UI/UX
- [x] Desain responsif (desktop, tablet, mobile)
- [x] Animasi dan transisi smooth
- [x] Color-coded status indicators
- [x] Empty state message
- [x] Konfirmasi sebelum menghapus
- [x] Scroll to top saat edit

### Code Quality
- [x] Struktur kode yang terorganisir (Class-based)
- [x] Komentar yang jelas
- [x] Separation of concerns (HTML, CSS, JS)
- [x] Event delegation yang efisien
- [x] Error handling yang baik

## Cara Menggunakan

### 1. Setup
- Buka file `index.html` di browser
- Aplikasi akan otomatis memuat data yang tersimpan

### 2. Menambah Tugas
1. Isi form dengan:
   - Nama tugas (wajib)
   - Mata kuliah (wajib)
   - Deadline (wajib)
   - Deskripsi (opsional)
2. Klik tombol "Tambah Tugas"
3. Tugas akan muncul di daftar tugas

### 3. Mengelola Tugas
- **Tandai Selesai**: Klik checkbox di sebelah tugas
- **Edit**: Klik tombol "Edit" untuk mengubah tugas
- **Hapus**: Klik tombol "Hapus" untuk menghapus tugas

### 4. Mencari dan Filter
- Gunakan search box untuk mencari tugas
- Gunakan dropdown status untuk filter berdasarkan status
- Gunakan dropdown mata kuliah untuk filter berdasarkan mata kuliah

## Struktur File

\`\`\`
student-task-manager/
├── index.html          # Struktur HTML aplikasi
├── styles.css          # Styling dan layout
├── script.js           # Logika aplikasi
└── README.md           # Dokumentasi
\`\`\`

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- IE 11: ⚠️ Partial support (localStorage tersedia, tapi beberapa fitur CSS mungkin tidak sempurna)

## Tips Penggunaan

1. **Backup Data**: Jika ingin backup data, gunakan browser DevTools untuk export localStorage
2. **Clear Data**: Hapus semua data dengan membuka DevTools → Application → localStorage → Clear All
3. **Mobile**: Aplikasi fully responsive, gunakan di smartphone dengan nyaman
4. **Deadline Reminder**: Tugas overdue akan ditampilkan dengan warna merah


Screenshot aplikasi yang sudah jadi (minimal 3 screenshot menunjukkan berbagai fitur)
<img width="949" height="418" alt="Screenshot 2025-10-27 142245" src="https://github.com/user-attachments/assets/72314676-10a0-4ed6-b128-3227762d40c8" />

<img width="949" height="418" alt="Screenshot 2025-10-27 142202" src="https://github.com/user-attachments/assets/47d5da53-c93c-4c03-8feb-21036fe0d4be" />

<img width="949" height="419" alt="Screenshot 2025-10-27 142111" src="https://github.com/user-attachments/assets/8c093785-7c92-4e44-9f9a-f6354d143319" />


