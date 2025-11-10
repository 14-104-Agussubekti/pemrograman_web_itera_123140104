import { useMemo } from 'react';

/**
 * Hook kustom untuk menghitung statistik berdasarkan daftar buku.
 * @param {Array} books - Array objek buku.
 */
const useBookStats = (books) => {
  // Gunakan useMemo agar statistik tidak dihitung ulang di setiap render,
  // kecuali jika daftar 'books' (dependensinya) berubah.
  const stats = useMemo(() => {
    const total = books.length;
    
    // Gunakan .reduce() untuk menghitung jumlah buku per status
    const statusCounts = books.reduce((acc, book) => {
      // acc['Ingin Dibeli'] = (acc['Ingin Dibeli'] || 0) + 1;
      acc[book.status] = (acc[book.status] || 0) + 1;
      return acc;
    }, {}); // Nilai awal accumulator adalah objek kosong

    // Kembalikan objek statistik
    return {
      total,
      inginDibeli: statusCounts['Ingin Dibeli'] || 0,
      sudahDimiliki: statusCounts['Sudah Dimiliki'] || 0,
      sedangDibaca: statusCounts['Sedang Dibaca'] || 0,
    };
  }, [books]); // Dependensi: hitung ulang hanya jika 'books' berubah

  return stats;
};

export default useBookStats;