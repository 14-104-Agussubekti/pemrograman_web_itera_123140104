import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BookContext';
import BookFilter from './BookFilter';
import BookItem from './BookItem'; // <-- Membutuhkan file BookItem.jsx

const BookList = () => {
  const { books } = useBooks(); // Ambil daftar buku dari context
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  // useMemo digunakan agar proses filter tidak berjalan di setiap render,
  // hanya ketika 'books', 'filterStatus', atau 'searchTerm' berubah.
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        // Filter berdasarkan status
        return filterStatus === 'Semua' || book.status === filterStatus;
      })
      .filter(book => {
        // Filter berdasarkan pencarian
        const term = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      });
  }, [books, filterStatus, searchTerm]);

  return (
    <section>
      <h2>Daftar Buku Saya</h2>
      <BookFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ul className="book-list">
        {filteredBooks.length === 0 && (
          <p>Tidak ada buku yang cocok dengan kriteria Anda.</p>
        )}
        {filteredBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;