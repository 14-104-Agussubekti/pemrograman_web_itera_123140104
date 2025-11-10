import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';

// Tidak ada impor CSS di sini, karena semua style
// sudah ditangani oleh 'src/index.css'

const StatsPage = () => {
  // Mengambil daftar buku dari context global
  const { books } = useBooks();
  
  // Menghitung statistik menggunakan custom hook
  const stats = useBookStats(books);

  return (
    // 'page-content' adalah kelas dari 'index.css' untuk padding
    <div className="page-content">
      <h1>Statistik Buku</h1>
      
      {/* 'stats-container' adalah kelas dari 'index.css' */}
      <div className="stats-container">
        <h3>Total Buku: <strong>{stats.total}</strong></h3>
        <ul>
          <li>Ingin Dibeli: <strong>{stats.inginDibeli}</strong></li>
          <li>Sudah Dimiliki: <strong>{stats.sudahDimiliki}</strong></li>
          <li>Sedang Dibaca: <strong>{stats.sedangDibaca}</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;