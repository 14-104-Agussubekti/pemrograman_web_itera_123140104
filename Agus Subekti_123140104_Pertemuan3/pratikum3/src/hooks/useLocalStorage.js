import { useState, useEffect } from 'react';

/**
 * Hook kustom untuk menyinkronkan state dengan localStorage.
 * @param {string} key - Kunci (nama) yang akan digunakan di localStorage.
 * @param {*} initialValue - Nilai default jika tidak ada data di localStorage.
 */
const useLocalStorage = (key, initialValue) => {
  // Gunakan fungsi dalam useState agar localStorage hanya dibaca
  // satu kali saat komponen pertama kali dimuat (inisialisasi).
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Jika ada data, parse JSON-nya. Jika tidak, gunakan nilai awal.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Tangani error jika parsing JSON gagal
      console.error("Gagal membaca localStorage", error);
      return initialValue;
    }
  });

  // Gunakan useEffect untuk menyimpan ke localStorage setiap kali state berubah.
  // Ini akan berjalan setiap kali 'key' atau 'storedValue' berubah.
  useEffect(() => {
    try {
      // Simpan nilai state ke localStorage sebagai string JSON.
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Tangani error jika localStorage penuh atau tidak tersedia
      console.error("Gagal menyimpan ke localStorage", error);
    }
  }, [key, storedValue]);

  // Kembalikan array [nilai, fungsiSetter], sama seperti useState.
  return [storedValue, setStoredValue];
};

export default useLocalStorage;