import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { STATUS_OPTIONS } from './BookFilter'; // Menggunakan ulang konstanta

const BookForm = () => {
  const { addBook, updateBook, currentBook, setCurrentBook } = useBooks();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS[0]); // Default ke opsi pertama
  const [error, setError] = useState('');

  const isEditMode = currentBook !== null;

  // Efek ini akan mengisi form ketika 'currentBook' (mode edit) berubah
  useEffect(() => {
    if (isEditMode) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setStatus(currentBook.status);
      setError(''); // Hapus error lama saat beralih ke mode edit
    }
  }, [currentBook, isEditMode]);

  // Fungsi untuk membersihkan form
  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setStatus(STATUS_OPTIONS[0]);
    setError('');
    setCurrentBook(null); // Penting: Keluar dari mode edit
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi
    if (!title.trim() || !author.trim()) {
      setError('Judul dan Penulis tidak boleh kosong!');
      return;
    }
    
    const bookData = { title, author, status };

    if (isEditMode) {
      // Panggil fungsi update dari context
      updateBook(currentBook.id, bookData);
    } else {
      // Panggil fungsi tambah dari context
      addBook(bookData);
    }
    
    resetForm(); // Bersihkan form setelah submit
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      {error && <p className="form-error">{error}</p>}
      
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Misal: Laskar Pelangi"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Misal: Andrea Hirata"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Buku' : 'Tambah Buku'}
        </button>
        {isEditMode && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;