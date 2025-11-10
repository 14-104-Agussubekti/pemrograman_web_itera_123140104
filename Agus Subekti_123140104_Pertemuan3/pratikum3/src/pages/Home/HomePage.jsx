import React from 'react';

// Path impor ini mengarah ke file komponen di folder 'src/components/'
import BookForm from '../../components/BookForm.jsx';
import BookList from '../../components/BookList.jsx';

const HomePage = () => {
  return (
    // 'page-content' adalah kelas dari 'index.css' untuk padding
    <div className="page-content">
      <h1>Manajemen Buku Pribadi</h1>
      
      {/* Merender komponen Form */}
      <BookForm />
      
      {/* Merender komponen Daftar Buku */}
      <BookList />
    </div>
  );
};

export default HomePage;