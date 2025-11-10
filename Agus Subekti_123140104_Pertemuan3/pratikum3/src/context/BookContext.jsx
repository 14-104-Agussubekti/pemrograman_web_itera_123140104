import React, { 
  createContext, 
  useContext, 
  useState, 
  useMemo
} from 'react';
// Mengimpor custom hook yang kita buat
import useLocalStorage from '../hooks/useLocalStorage';

// 1. Membuat Context
const BookContext = createContext();

// 2. Membuat Custom Hook (helper) untuk mempermudah penggunaan context
// Komponen lain akan memanggil useBooks() daripada useContext(BookContext)
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    // Memberi peringatan jika <BookProvider> lupa dipasang
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
};

// 3. Membuat Komponen Provider
// Komponen ini akan membungkus aplikasi Anda (di App.jsx)
export const BookProvider = ({ children }) => {
  // Menggunakan useLocalStorage untuk state 'books'
  // Data akan otomatis tersimpan & diambil dari localStorage
  const [books, setBooks] = useLocalStorage('books', []);
  
  // State untuk melacak buku mana yang sedang diedit
  const [currentBook, setCurrentBook] = useState(null); 

  // Fungsi untuk menambah buku baru
  const addBook = (book) => {
    // Menambahkan ID unik (timestamp) ke buku baru
    const newBook = { ...book, id: Date.now() };
    setBooks([...books, newBook]); // Menambahkan ke array state
  };

  // Fungsi untuk memperbarui buku yang ada
  const updateBook = (id, updatedBook) => {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
    setCurrentBook(null); // Keluar dari mode edit setelah update
  };

  // Fungsi untuk menghapus buku
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };
  
  // useMemo digunakan untuk optimasi.
  // Objek 'value' hanya akan dibuat ulang jika 'books' atau 'currentBook' berubah.
  const value = useMemo(() => ({
    books,
    addBook,
    updateBook,
    deleteBook,
    currentBook,
    setCurrentBook,
  }), [books, currentBook]);

  // 4. Me-return provider dengan 'value' yang berisi state dan fungsi
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};