import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Impor App.css di sini jika Anda mau, tapi App.jsx sudah melakukannya.
// Mengimpor 'App.css' di 'App.jsx' atau di sini sama-sama valid.
// Namun, 'App.jsx' sudah mengimpornya, jadi kita tidak perlu melakukannya lagi.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)