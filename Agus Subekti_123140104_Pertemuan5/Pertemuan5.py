import sys
from abc import ABC, abstractmethod

# ==========================================================
# 1. ABSTRACT BASE CLASS (LibraryItem)
# ==========================================================

class LibraryItem(ABC):
    """
    Abstract Base Class (Blueprint) untuk semua item di perpustakaan.
    """
    
    def __init__(self, id_item, judul):
        """
        Constructor untuk LibraryItem.
        Menggunakan encapsulation (protected) untuk atribut.
        """
        # Encapsulation: Atribut 'protected' (konvensi _namAatribut)
        self._id_item = id_item
        self._judul = judul
        
    @property
    def id_item(self):
        """
        Getter publik untuk mengakses _id_item (protected).
        """
        return self._id_item

    @property
    def judul(self):
        """
        Getter publik untuk mengakses _judul (protected).
        """
        return self._judul

    @abstractmethod
    def display_info(self):
        """
        Abstract method untuk menampilkan informasi detail item.
        """
        pass

# ==========================================================
# 2. SUBCLASSES (Book & Magazine)
# (Penerapan Inheritance & Polymorphism)
# ==========================================================

class Book(LibraryItem):
    """
    Subclass untuk item Buku, mewarisi (inheritance) dari LibraryItem.
    """
    
    def __init__(self, id_item, judul, penulis):
        super().__init__(id_item, judul)
        self._penulis = penulis

    def display_info(self):
        """
        Implementasi (override) method abstract display_info.
        (Polymorphism)
        """
        print(f"[BUKU]   | ID: {self.id_item} | Judul: {self.judul} | Penulis: {self._penulis}")

class Magazine(LibraryItem):
    """
    Subclass untuk item Majalah, mewarisi (inheritance) dari LibraryItem.
    """
    
    def __init__(self, id_item, judul, edisi):
        super().__init__(id_item, judul)
        self._edisi = edisi

    def display_info(self):
        """
        Implementasi (override) method abstract display_info.
        (Polymorphism)
        """
        print(f"[MAJALAH] | ID: {self.id_item} | Judul: {self.judul} | Edisi: {self._edisi}")

# ==========================================================
# 3. CLASS PENGELOLA (Library)
# (Penerapan Encapsulation dengan atribut Private)
# ==========================================================

class Library:
    """
    Class untuk mengelola koleksi LibraryItem.
    """
    
    def __init__(self):
        """
        Constructor untuk Library.
        Menggunakan atribut private (__items) untuk menyimpan koleksi.
        """
        # Encapsulation: Atribut 'private'
        self.__items = []

    def tambah_item(self, item):
        """
        Menambahkan objek (turunan LibraryItem) ke dalam perpustakaan.
        """
        if isinstance(item, LibraryItem):
            # Cek duplikasi ID sebelum menambahkan
            for existing_item in self.__items:
                if existing_item.id_item.lower() == item.id_item.lower():
                    print(f"\n(Error: Item dengan ID '{item.id_item}' sudah ada.)")
                    return
            
            self.__items.append(item)
            print(f"\n(Info: Item '{item.judul}' berhasil ditambahkan.)")
        else:
            print(f"\n(Error: Objek yang ditambahkan bukan turunan LibraryItem.)")

    def tampilkan_item_tersedia(self):
        """
        Menampilkan semua item yang ada di perpustakaan.
        (Mendemonstrasikan Polymorphism)
        """
        print("\n" + "="*50)
        print(" DAFTAR SEMUA ITEM DI PERPUSTAKAAN")
        print("="*50)
        
        if not self.__items:
            print("Perpustakaan masih kosong.")
            print("="*50)
            return

        # Polymorphism:
        # Memanggil item.display_info() yang sesuai (Book atau Magazine)
        for item in self.__items:
            item.display_info()
        print("="*50)

    def cari_item(self, keyword):
        """
        Mencari item berdasarkan ID atau Judul (case-insensitive).
        """
        print(f"\n--- Hasil Pencarian untuk: '{keyword}' ---")
        ditemukan = False
        keyword_lower = keyword.lower()
        
        for item in self.__items:
            # Menggunakan @property .id_item dan .judul
            if (keyword_lower == item.id_item.lower()) or \
               (keyword_lower in item.judul.lower()):
                
                item.display_info() # Polymorphism
                ditemukan = True
                
        if not ditemukan:
            print("Item tidak ditemukan.")
        print("-"*(38 + len(keyword)))

# ==========================================================
# 5. CONTOH PENGGUNAAN (DRIVER CODE INTERAKTIF)
# ==========================================================

def menu_tambah_item(perpustakaan):
    """Fungsi helper untuk sub-menu tambah item."""
    print("\n-- Pilih Tipe Item --")
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Kembali ke Menu Utama")
    pilihan_tambah = input("Pilihan (1-3): ")

    if pilihan_tambah == '1':
        # Tambah Buku
        print("\n--- Formulir Tambah Buku Baru ---")
        id_item = input("Masukkan ID Buku (cth: B001): ")
        judul = input("Masukkan Judul Buku: ")
        penulis = input("Masukkan Nama Penulis: ")
        
        if not id_item or not judul or not penulis:
            print("\n(Error: Semua field harus diisi.)")
            return
            
        buku_baru = Book(id_item, judul, penulis)
        perpustakaan.tambah_item(buku_baru)

    elif pilihan_tambah == '2':
        # Tambah Majalah
        print("\n--- Formulir Tambah Majalah Baru ---")
        id_item = input("Masukkan ID Majalah (cth: M001): ")
        judul = input("Masukkan Judul Majalah: ")
        edisi = input("Masukkan Edisi (cth: Januari 2024): ")
        
        if not id_item or not judul or not edisi:
            print("\n(Error: Semua field harus diisi.)")
            return
            
        majalah_baru = Magazine(id_item, judul, edisi)
        perpustakaan.tambah_item(majalah_baru)
        
    elif pilihan_tambah == '3':
        return
        
    else:
        print("\n(Error: Pilihan tidak valid.)")


def main():

    perpustakaan_utama = Library()
    print("===== SELAMAT DATANG DI SISTEM MANAJEMEN PERPUSTAKAAN =====")

    while True:
        print("\n" + "="*20)
        print("     MENU UTAMA")
        print("="*20)
        print("1. Tambahkan Item Baru")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item (berdasarkan ID atau Judul)")
        print("4. Keluar")
        
        pilihan = input("Masukkan pilihan Anda (1-4): ")
        
        if pilihan == '1':
            # Fitur: Menambahkan item
            menu_tambah_item(perpustakaan_utama)
            
        elif pilihan == '2':
            # Fitur: Menampilkan daftar item
            perpustakaan_utama.tampilkan_item_tersedia()
            
        elif pilihan == '3':
            # Fitur: Mencari item
            keyword = input("\nMasukkan ID atau Judul yang ingin dicari: ")
            if keyword:
                perpustakaan_utama.cari_item(keyword)
            else:
                print("\n(Error: Kata kunci pencarian tidak boleh kosong.)")
            
        elif pilihan == '4':
            print("\nTerima kasih telah menggunakan sistem. Sampai jumpa!")
            sys.exit() # Keluar dari program
            
        else:
            print("\n(Error: Pilihan tidak valid. Silakan masukkan angka 1-4.)")


if __name__ == "__main__":
    main()