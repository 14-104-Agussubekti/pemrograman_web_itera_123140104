import React from 'react';

// Komponen Layout ini membungkus halaman (via 'children')
// dan menyediakan navigasi
const Layout = ({ page, setPage, children }) => {
  return (
    <div className="app-container">
      <nav>
        <button 
          className={page === 'home' ? 'active' : ''} 
          onClick={() => setPage('home')}
        >
          Daftar Buku
        </button>
        <button 
          className={page === 'stats' ? 'active' : ''} 
          onClick={() => setPage('stats')}
        >
          Statistik
        </button>
      </nav>
      
      {/* 'children' adalah komponen halaman (HomePage atau StatsPage) */}
      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;