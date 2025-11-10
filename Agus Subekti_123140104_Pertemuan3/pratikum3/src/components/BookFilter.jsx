import React from 'react';

// Konstanta ini bisa diekspor agar bisa dipakai di BookForm juga
export const STATUS_OPTIONS = ['Ingin Dibeli', 'Sudah Dimiliki', 'Sedang Dibaca'];

const BookFilter = ({ filterStatus, setFilterStatus, searchTerm, setSearchTerm }) => {
  return (
    <div className="filter-controls">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari berdasarkan judul atau penulis..."
        aria-label="Cari Buku"
      />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        aria-label="Filter berdasarkan status"
      >
        <option value="Semua">Semua Status</option>
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default BookFilter;