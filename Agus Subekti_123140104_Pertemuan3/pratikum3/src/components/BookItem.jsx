import React, { useCallback } from 'react';
import { useBooks } from '../context/BookContext';

// Helper untuk mendapatkan kelas CSS berdasarkan status
const getStatusClass = (status) => {
  const statusMap = {
    'Ingin Dibeli': 'status-ingin-dibeli',
    'Sudah Dimiliki': 'status-sudah-dimiliki',
    'Sedang Dibaca': 'status-sedang-dibaca',
  };
  return statusMap[status] || '';
};

const BookItem = ({ book }) => {
  const { deleteBook, setCurrentBook } = useBooks();

  // useCallback untuk optimasi, agar fungsi tidak dibuat ulang
  // di setiap render kecuali 'book' atau 'setCurrentBook' berubah.
  const handleEdit = useCallback(() => {
    setCurrentBook(book); // Set mode edit di context
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas ke form
  }, [book, setCurrentBook]);

  const handleDelete = useCallback(() => {
    // Gunakan konfirmasi browser (untuk praktikum ini)
    if (window.confirm(`Yakin ingin menghapus "${book.title}"?`)) {
      deleteBook(book.id);
    }
  }, [book.id, book.title, deleteBook]);

  return (
    <li className="book-item">
      <div className="book-item-details">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span className={`status ${getStatusClass(book.status)}`}>
          {book.status}
        </span>
      </div>
      <div className="book-item-actions">
        <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Hapus</button>
      </div>
    </li>
  );
};

// React.memo membungkus komponen, mencegah render ulang jika
// props ('book') tidak berubah.
export default React.memo(BookItem);