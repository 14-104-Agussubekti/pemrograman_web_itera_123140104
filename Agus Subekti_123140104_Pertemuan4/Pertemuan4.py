import os

def hitung_nilai_akhir(mahasiswa):
    """
    Menghitung nilai akhir seorang mahasiswa berdasarkan bobot.
    30% UTS + 40% UAS + 30% Tugas.
    """
    return (0.30 * mahasiswa['nilai_uts']) + \
           (0.40 * mahasiswa['nilai_uas']) + \
           (0.30 * mahasiswa['nilai_tugas'])

def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir.
    A: >= 80, B: >= 70, C: >= 60, D: >= 50, E: < 50
    """
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'


def tampilkan_data_mahasiswa(database):
    """
    Menampilkan data mahasiswa dalam format tabel yang rapi.
    Fungsi ini menerima list dictionary mahasiswa.
    """
    # Membersihkan layar terminal
    os.system('cls' if os.name == 'nt' else 'clear') 
    
    print("=" * 110)
    # Mencetak header tabel dengan format (rata kiri dan lebar kolom)
    print(f"| {'No':<3} | {'Nama':<20} | {'NIM':<10} | {'UTS':<7} | {'UAS':<7} | {'Tugas':<7} | {'Nilai Akhir':<12} | {'Grade':<5} |")
    print("=" * 110)

    # Cek jika database kosong
    if not database:
        print(f"| {'Tidak ada data untuk ditampilkan':^108} |")
    else:
        # Loop untuk setiap data mahasiswa
        for i, mhs in enumerate(database, 1):
            nilai_akhir = hitung_nilai_akhir(mhs)
            grade = tentukan_grade(nilai_akhir)
            
            # Mencetak baris data mahasiswa
            print(f"| {i:<3} | {mhs['nama']:<20} | {mhs['NIM']:<10} | {mhs['nilai_uts']:<7.2f} | {mhs['nilai_uas']:<7.2f} | {mhs['nilai_tugas']:<7.2f} | {nilai_akhir:<12.2f} | {grade:<5} |")
    
    print("=" * 110)

def tambah_mahasiswa(database):
    """
    Meminta input dari pengguna untuk menambahkan data mahasiswa baru
    ke dalam list database.
    """
    os.system('cls' if os.name == 'nt' else 'clear')
    print("--- Tambah Data Mahasiswa Baru ---")
    
    nama = input("Nama       : ")
    nim = input("NIM        : ")
    
    # Loop validasi untuk memastikan input nilai adalah angka
    while True:
        try:
            nilai_uts = float(input("Nilai UTS  : "))
            nilai_uas = float(input("Nilai UAS  : "))
            nilai_tugas = float(input("Nilai Tugas: "))
            break # Keluar dari loop jika semua input valid
        except ValueError:
            print("Input tidak valid. Nilai harus berupa angka. Silakan coba lagi.")

    # Membuat dictionary baru dan menambahkannya ke database
    mahasiswa_baru = {
        'nama': nama,
        'NIM': nim,
        'nilai_uts': nilai_uts,
        'nilai_uas': nilai_uas,
        'nilai_tugas': nilai_tugas
    }
    database.append(mahasiswa_baru)
    
    print(f"\nData untuk '{nama}' berhasil ditambahkan.")

def cari_nilai_ekstrem(database):
    """
    Mencari dan menampilkan mahasiswa dengan nilai akhir
    tertinggi dan terendah.
    """
    os.system('cls' if os.name == 'nt' else 'clear')
    print("--- Nilai Tertinggi dan Terendah ---")

    if not database:
        print("Database masih kosong. Tidak ada data untuk dianalisis.")
        return

    # Menggunakan fungsi max() dan min() dengan 'key' lambda
    # untuk mencari mahasiswa berdasarkan hasil fungsi hitung_nilai_akhir
    
    mahasiswa_tertinggi = max(database, key=hitung_nilai_akhir)
    nilai_tertinggi = hitung_nilai_akhir(mahasiswa_tertinggi)
    
    mahasiswa_terendah = min(database, key=hitung_nilai_akhir)
    nilai_terendah = hitung_nilai_akhir(mahasiswa_terendah)

    print("\n🎓 Mahasiswa dengan Nilai Tertinggi:")
    print(f"   Nama  : {mahasiswa_tertinggi['nama']}")
    print(f"   NIM   : {mahasiswa_tertinggi['NIM']}")
    print(f"   Nilai : {nilai_tertinggi:.2f} (Grade: {tentukan_grade(nilai_tertinggi)})")

    print("\n📉 Mahasiswa dengan Nilai Terendah:")
    print(f"   Nama  : {mahasiswa_terendah['nama']}")
    print(f"   NIM   : {mahasiswa_terendah['NIM']}")
    print(f"   Nilai : {nilai_terendah:.2f} (Grade: {tentukan_grade(nilai_terendah)})")

def filter_berdasarkan_grade(database):
    """
    Meminta pengguna memasukkan grade dan menampilkan
    semua mahasiswa yang memiliki grade tersebut.
    """
    os.system('cls' if os.name == 'nt' else 'clear')
    print("--- Filter Mahasiswa Berdasarkan Grade ---")
    
    grade_dicari = input("Masukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()
    
    # Validasi input grade
    if grade_dicari not in ['A', 'B', 'C', 'D', 'E']:
        print("Input tidak valid. Grade harus A, B, C, D, or E.")
        return

    # Membuat list baru berisi mahasiswa yang sesuai filter
    hasil_filter = []
    for mhs in database:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_dicari:
            hasil_filter.append(mhs)

    if not hasil_filter:
        print(f"\nTidak ada mahasiswa yang mendapatkan grade '{grade_dicari}'.")
    else:
        print(f"\nMenampilkan Mahasiswa dengan Grade '{grade_dicari}':")
        # Menggunakan kembali fungsi tampilkan_data_mahasiswa
        # untuk menampilkan hasil filter dengan format tabel
        tampilkan_data_mahasiswa(hasil_filter)

def hitung_rata_rata_kelas(database):
    """
    Menghitung dan menampilkan nilai rata-rata (dari nilai akhir)
    untuk seluruh kelas.
    """
    os.system('cls' if os.name == 'nt' else 'clear')
    print("--- Rata-rata Nilai Kelas ---")

    if not database:
        print("Database masih kosong. Rata-rata tidak dapat dihitung.")
        return

    # Menjumlahkan semua nilai akhir
    total_nilai_akhir = 0
    for mhs in database:
        total_nilai_akhir += hitung_nilai_akhir(mhs)
        
    # Menghitung rata-rata
    rata_rata = total_nilai_akhir / len(database)

    print(f"Jumlah Mahasiswa : {len(database)}")
    print(f"Total Nilai Akhir: {total_nilai_akhir:.2f}")
    print(f"Rata-rata Kelas  : {rata_rata:.2f}")

# -------------------------------------------------------------------
# BAGIAN 3: MENU UTAMA DAN EKSEKUSI PROGRAM
# -------------------------------------------------------------------

def main():
    """
    Fungsi utama yang menjalankan program, menampilkan menu,
    dan memanggil fungsi-fungsi lain.
    """
    
    # Data awal (dummy data)
    database_mahasiswa = [
        {'nama': 'Budi Santoso', 'NIM': '121001', 'nilai_uts': 80, 'nilai_uas': 85, 'nilai_tugas': 90},
        {'nama': 'Siti Aminah', 'NIM': '121002', 'nilai_uts': 70, 'nilai_uas': 75, 'nilai_tugas': 65},
        {'nama': 'Ahmad Dahlan', 'NIM': '121003', 'nilai_uts': 50, 'nilai_uas': 45, 'nilai_tugas': 60},
        {'nama': 'Dewi Lestari', 'NIM': '121004', 'nilai_uts': 95, 'nilai_uas': 90, 'nilai_tugas': 88},
        {'nama': 'Joko Widodo', 'NIM': '121005', 'nilai_uts': 60, 'nilai_uas': 65, 'nilai_tugas': 70},
    ]

    # Main loop program
    while True:
        # Menampilkan menu
        print("\n" + "="*40)
        print("    Program Pengelolaan Nilai Mahasiswa")
        print("="*40)
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Tambah Data Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi dan Terendah")
        print("4. Filter Mahasiswa Berdasarkan Grade")
        print("5. Tampilkan Rata-rata Nilai Kelas")
        print("6. Keluar dari Program")
        print("="*40)
        
        pilihan = input("Masukkan pilihan Anda (1-6): ")

        if pilihan == '1':
            tampilkan_data_mahasiswa(database_mahasiswa)
            input("\nTekan Enter untuk kembali ke menu...")
        
        elif pilihan == '2':
            tambah_mahasiswa(database_mahasiswa)
            input("\nTekan Enter untuk kembali ke menu...")

        elif pilihan == '3':
            cari_nilai_ekstrem(database_mahasiswa)
            input("\nTekan Enter untuk kembali ke menu...")
        
        elif pilihan == '4':
            filter_berdasarkan_grade(database_mahasiswa)
            input("\nTekan Enter untuk kembali ke menu...")

        elif pilihan == '5':
            hitung_rata_rata_kelas(database_mahasiswa)
            input("\nTekan Enter untuk kembali ke menu...")

        elif pilihan == '6':
            print("\nTerima kasih telah menggunakan program ini. Sampai jumpa!")
            break # Keluar dari loop while True

        else:
            print("\nPilihan tidak valid. Silakan masukkan angka dari 1 hingga 6.")
            input("\nTekan Enter untuk mencoba lagi...")

# Menjalankan fungsi main() hanya jika file ini dieksekusi sebagai script utama
if __name__ == "__main__":
    main()