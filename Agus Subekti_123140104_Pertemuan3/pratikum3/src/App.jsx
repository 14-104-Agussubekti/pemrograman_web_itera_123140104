import React, { useState } from 'react';
import { BookProvider } from './context/BookContext';
import HomePage from './pages/Home/HomePage';
import StatsPage from './pages/Stats/StatsPage';
import './index.css'; // Impor stylesheet global

function App() {
  const [page, setPage] = useState('home'); // Navigasi 'home' atau 'stats'

  return (
    // Provider membungkus seluruh aplikasi
    <BookProvider>
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
        
        {/* Simulasi Routing Halaman */}
        {page === 'home' && <HomePage />}
        {page === 'stats' && <StatsPage />}
      </div>
    </BookProvider>
  );
}

export default App;