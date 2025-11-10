# Personal Dashboard

Aplikasi Personal Dashboard sederhana yang membantu Anda mengelola jadwal kuliah, daftar tugas, catatan, dan informasi cuaca. Aplikasi ini dibangun menggunakan HTML, CSS, dan JavaScript modern (ES6+) dengan penyimpanan data lokal menggunakan localStorage.

## Fitur Utama

### 1. Jadwal Kuliah
- Tambah, edit, dan hapus jadwal kuliah
- Menampilkan informasi: mata kuliah, waktu, ruangan, dan nama dosen
- Antarmuka yang intuitif dan mudah digunakan

### 2. Daftar Tugas
- Kelola tugas-tugas akademik Anda
- Tandai tugas sebagai selesai atau belum selesai
- Lihat deadline untuk setiap tugas
- Edit dan hapus tugas sesuai kebutuhan

### 3. Catatan
- Buat catatan pribadi dengan judul dan konten
- Simpan tanggal pembuatan catatan secara otomatis
- Edit dan hapus catatan kapan saja
- Akses semua catatan Anda di satu tempat

### 4. Informasi Cuaca
- Tampilan cuaca real-time (simulasi)
- Menampilkan suhu, kelembaban, kecepatan angin
- Update otomatis setiap kali membuka tab cuaca

### 5. Jam Digital
- Menampilkan waktu real-time di header
- Update setiap detik secara otomatis

## Implementasi ES6+ Features

### 1. Classes
\`\`\`javascript
class Schedule { ... }
class Task { ... }
class Note { ... }
class Dashboard { ... }
\`\`\`
Menggunakan class untuk struktur data dan logika aplikasi yang terorganisir.

### 2. Arrow Functions (Lebih dari 3)
\`\`\`javascript
init = () => { ... }
setupEventListeners = () => { ... }
switchTab = (tabName) => { ... }
updateCurrentTime = () => { ... }
openModal = (type) => { ... }
closeModal = () => { ... }
getTypeLabel = (type) => { ... }
getFormFields = (type) => { ... }
handleFormSubmit = (e) => { ... }
saveSchedule = () => { ... }
saveTask = () => { ... }
saveNote = () => { ... }
deleteSchedule = (id) => { ... }
deleteTask = (id) => { ... }
deleteNote = (id) => { ... }
toggleTask = (id) => { ... }
editSchedule = (id) => { ... }
editTask = (id) => { ... }
editNote = (id) => { ... }
renderSchedules = () => { ... }
renderTasks = () => { ... }
renderNotes = () => { ... }
renderAllData = () => { ... }
loadWeatherData = async () => { ... }
fetchWeatherData = () => { ... }
renderWeather = (data) => { ... }
renderWeatherError = () => { ... }
saveToLocalStorage = () => { ... }
loadFromLocalStorage = () => { ... }
\`\`\`

### 3. Template Literals
Digunakan untuk rendering HTML dinamis:
\`\`\`javascript
// Contoh dalam renderSchedules()
container.innerHTML = this.schedules.map(schedule => `
    <div class="schedule-item">
        <div class="item-content">
            <div class="item-title">${schedule.subject}</div>
            <div class="item-description">Ruangan: ${schedule.room}</div>
            ...
        </div>
    </div>
`).join('');
\`\`\`

### 4. Async/Await dan Promises
\`\`\`javascript
// Async function untuk load weather
loadWeatherData = async () => {
    try {
        const weatherData = await this.fetchWeatherData();
        this.renderWeather(weatherData);
    } catch (error) {
        console.error('[v0] Error loading weather:', error);
        this.renderWeatherError();
    }
}

// Promise untuk simulasi API call
fetchWeatherData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const weatherData = { ... };
            resolve(weatherData);
        }, 500);
    });
}
\`\`\`

### 5. Let dan Const
Digunakan di seluruh aplikasi untuk deklarasi variabel:
\`\`\`javascript
const container = document.getElementById('scheduleList');
const data = localStorage.getItem('dashboardData');
let dashboard;
\`\`\`

### 6. Destructuring dan Spread Operator
\`\`\`javascript
// Destructuring dalam form data
const { schedules, tasks, notes } = parsed;

// Spread operator dalam array operations
this.schedules = this.schedules.filter(s => s.id !== id);
\`\`\`

### 7. Array Methods
\`\`\`javascript
// map() untuk rendering
this.schedules.map(schedule => `...`)

// filter() untuk delete
this.schedules = this.schedules.filter(s => s.id !== id);

// find() untuk search
const schedule = this.schedules.find(s => s.id === id);
\`\`\`

## localStorage Implementation

Semua data disimpan secara otomatis di localStorage browser:

\`\`\`javascript
// Struktur data yang disimpan
{
    "dashboardData": {
        "schedules": [...],
        "tasks": [...],
        "notes": [...]
    }
}
\`\`\`

Data akan tetap tersimpan bahkan setelah menutup browser dan membuka kembali aplikasi.

## Cara Penggunaan

### 1. Menambah Item
- Klik tombol "+ Tambah" di setiap tab
- Isi form yang muncul
- Klik "Simpan"

### 2. Mengedit Item
- Klik tombol "Edit" pada item yang ingin diubah
- Ubah data sesuai kebutuhan
- Klik "Simpan"

### 3. Menghapus Item
- Klik tombol "Hapus" pada item yang ingin dihapus
- Item akan langsung terhapus

### 4. Menandai Tugas Selesai
- Klik tombol "Selesai" pada tugas
- Tugas akan ditandai sebagai selesai (dengan strikethrough)
- Klik "Buka" untuk menandai belum selesai

## Desain dan Warna

- **Warna Utama**: Biru (#002349)
- **Warna Aksen**: Emas (#957C3D)
- **Desain**: Modern, clean, dan responsif
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif

## Responsivitas

Aplikasi ini responsif dan dapat diakses di berbagai ukuran layar:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Browser Compatibility

- Chrome (versi terbaru)
- Firefox (versi terbaru)
- Safari (versi terbaru)
- Edge (versi terbaru)

## File Structure

\`\`\`
personal-dashboard/
├── index.html
├── styles.css
├── app.js
└── README.md
\`\`\`

## Teknologi yang Digunakan

- **HTML5**: Struktur semantik
- **CSS3**: Styling dan responsive design
- **JavaScript ES6+**: Logika aplikasi
- **localStorage**: Penyimpanan data lokal

## Fitur Tambahan

- Real-time clock di header
- Modal dialog untuk form input
- Empty state messages
- Smooth animations dan transitions
- Hover effects pada items

## Pengembangan Lebih Lanjut

Fitur yang dapat ditambahkan di masa depan:
- Integrasi dengan API cuaca real-time
- Export data ke CSV/PDF
- Dark mode
- Notifikasi untuk deadline tugas
- Kategori dan tag untuk catatan
- Sinkronisasi cloud

## Lisensi

Bebas digunakan untuk keperluan pendidikan dan pribadi.

## Author

Dibuat sebagai proyek pembelajaran ES6+ dan Web Development.
