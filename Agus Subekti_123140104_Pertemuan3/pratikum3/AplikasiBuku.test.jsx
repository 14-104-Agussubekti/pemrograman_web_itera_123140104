// 1. PERBAIKAN: Impor 'jest-dom' secara manual di sini
import '@testing-library/jest-dom'; 

// 2. Impor 'user-event'
import userEvent from '@testing-library/user-event';

// 3. Impor helper RTL
import { render, screen, cleanup, within } from '@testing-library/react';

// 4. Impor komponen App
import App from './src/App.jsx';

// 5. PERBAIKAN: Tidak ada lagi 'import { describe, ... } from 'vitest''
//    karena 'globals: true' di vitest.config.js

// --- Mock untuk LocalStorage ---
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

// --- Pengaturan Tes (beforeEach/afterEach/vi adalah global) ---
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
  vi.spyOn(window, 'confirm').mockImplementation(() => true);
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// --- Helper Function (Diperbarui untuk userEvent) ---
const tambahBuku = async (user, { judul, penulis, status }) => {
  const judulInput = screen.getByLabelText('Judul Buku');
  const penulisInput = screen.getByLabelText('Penulis');
  const statusSelect = screen.getByLabelText('Status');
  const submitButton = screen.getByRole('button', { name: 'Tambah Buku' });

  // Mensimulasikan pengguna mengetik
  if (judul) {
    await user.type(judulInput, judul);
  }
  if (penulis) {
    await user.type(penulisInput, penulis);
  }

  // Mensimulasikan pengguna memilih dari dropdown
  if (status) {
    await user.selectOptions(statusSelect, status);
  }
  
  // Mensimulasikan pengguna mengklik
  await user.click(submitButton);
};


// --- Blok Tes (describe, test, expect adalah global) ---
describe('Aplikasi Manajemen Buku (dengan User-Event)', () => {

  /**
   * Tes 1: Render komponen App
   */
  test('1. Render komponen App dengan benar', () => {
    render(<App />);
    expect(screen.getByText('Manajemen Buku Pribadi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daftar Buku' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Statistik' })).toBeInTheDocument();
    expect(screen.getByLabelText('Judul Buku')).toBeInTheDocument();
  });

  /**
   * Tes 2: Penambahan buku baru
   */
  test('2. Penambahan buku baru melalui form', async () => {
    const user = userEvent.setup(); 
    render(<App />);
    
    await tambahBuku(user, {
      judul: 'Buku Tes 1',
      penulis: 'Penulis Tes',
      status: 'Sedang Dibaca'
    });
    
    const list = screen.getByRole('list');
    const bookItem = within(list).getByText('Buku Tes 1');
    
    expect(bookItem).toBeInTheDocument();
    expect(within(list).getByText('Penulis Tes')).toBeInTheDocument();
    expect(within(list).getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  /**
   * Tes 3: Validasi form (error handling)
   */
  test('3. Validasi form (error handling)', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const submitButton = screen.getByRole('button', { name: 'Tambah Buku' });
    await user.click(submitButton);
    
    expect(screen.getByText('Judul dan Penulis tidak boleh kosong!')).toBeInTheDocument();
    
    const listItems = screen.queryByRole('listitem');
    expect(listItems).not.toBeInTheDocument();
  });

  /**
   * Tes 4: Penghapusan buku
   */
  test('4. Penghapusan buku', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await tambahBuku(user, {
      judul: 'Buku Untuk Dihapus',
      penulis: 'Penulis Fana',
      status: 'Ingin Dibeli'
    });
    
    let bookItem = screen.getByText('Buku Untuk Dihapus');
    expect(bookItem).toBeInTheDocument();
    
    const bookListItem = bookItem.closest('li');
    const deleteButton = within(bookListItem).getByRole('button', { name: 'Hapus' });
    
    await user.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Buku Untuk Dihapus')).not.toBeInTheDocument();
  });

  /**
   * Tes 5: Filter buku berdasarkan status
   */
  test('5. Filter buku berdasarkan status', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await tambahBuku(user, {
      judul: 'Buku A',
      penulis: 'Penulis A',
      status: 'Sudah Dimiliki'
    });
    await tambahBuku(user, {
      judul: 'Buku B',
      penulis: 'Penulis B',
      status: 'Sedang Dibaca'
    });

    expect(screen.getByText('Buku A')).toBeInTheDocument();
    expect(screen.getByText('Buku B')).toBeInTheDocument();
    
    const filterSelect = screen.getByLabelText('Filter berdasarkan status');
    
    await user.selectOptions(filterSelect, 'Sedang Dibaca');
    
    expect(screen.queryByText('Buku A')).not.toBeInTheDocument();
    expect(screen.getByText('Buku B')).toBeInTheDocument();

    await user.selectOptions(filterSelect, 'Semua');
    
    expect(screen.getByText('Buku A')).toBeInTheDocument();
    expect(screen.getByText('Buku B')).toBeInTheDocument();
  });
  
  /**
   * Tes 6 (Bonus): Halaman Statistik
   */
  test('6. Halaman Statistik berfungsi dengan benar', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await tambahBuku(user, { judul: 'Buku A', penulis: 'A', status: 'Sudah Dimiliki' });
    await tambahBuku(user, { judul: 'Buku B', penulis: 'B', status: 'Sedang Dibaca' });
    await tambahBuku(user, { judul: 'Buku C', penulis: 'C', status: 'Sedang Dibaca' });
    
    await user.click(screen.getByRole('button', { name: 'Statistik' }));
    
    expect(screen.queryByLabelText('Judul Buku')).not.toBeInTheDocument();
    
    const statsList = screen.getByRole('list');
    expect(within(statsList).getByText('Ingin Dibeli:').closest('li')).toHaveTextContent('Ingin Dibeli: 0');
    expect(within(statsList).getByText('Sudah Dimiliki:').closest('li')).toHaveTextContent('Sudah Dimiliki: 1');
    expect(within(statsList).getByText('Sedang Dibaca:').closest('li')).toHaveTextContent('Sedang Dibaca: 2');
  });
  
});