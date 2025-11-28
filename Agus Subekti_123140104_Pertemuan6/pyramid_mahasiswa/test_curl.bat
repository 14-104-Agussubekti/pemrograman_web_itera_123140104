@echo off
REM Testing API Matakuliah dengan curl

echo.
echo ============================================================
echo TEST 1: GET - Mendapatkan Semua Matakuliah
echo ============================================================
echo curl -X GET http://localhost:6543/api/matakuliah
echo.
curl -X GET http://localhost:6543/api/matakuliah
echo.
echo.

echo ============================================================
echo TEST 2: GET - Mendapatkan Satu Matakuliah (ID=1)
echo ============================================================
echo curl -X GET http://localhost:6543/api/matakuliah/1
echo.
curl -X GET http://localhost:6543/api/matakuliah/1
echo.
echo.

echo ============================================================
echo TEST 3: POST - Menambahkan Matakuliah Baru
echo ============================================================
echo curl -X POST http://localhost:6543/api/matakuliah ^
echo   -H "Content-Type: application/json" ^
echo   -d "{\"kode_mk\": \"MK005\", \"nama_mk\": \"Mobile Development\", \"sks\": 3, \"semester\": 5}"
echo.
curl -X POST http://localhost:6543/api/matakuliah ^
  -H "Content-Type: application/json" ^
  -d "{\"kode_mk\": \"MK005\", \"nama_mk\": \"Mobile Development\", \"sks\": 3, \"semester\": 5}"
echo.
echo.

echo ============================================================
echo TEST 4: PUT - Mengupdate Matakuliah (ID=1)
echo ============================================================
echo curl -X PUT http://localhost:6543/api/matakuliah/1 ^
echo   -H "Content-Type: application/json" ^
echo   -d "{\"nama_mk\": \"Pemrograman Python Lanjut\", \"sks\": 4}"
echo.
curl -X PUT http://localhost:6543/api/matakuliah/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"nama_mk\": \"Pemrograman Python Lanjut\", \"sks\": 4}"
echo.
echo.

echo ============================================================
echo TEST 5: DELETE - Menghapus Matakuliah (ID=5)
echo ============================================================
echo curl -X DELETE http://localhost:6543/api/matakuliah/5
echo.
curl -X DELETE http://localhost:6543/api/matakuliah/5
echo.
echo.

echo ============================================================
echo TEST 6: GET - Verifikasi Setelah Update
echo ============================================================
echo curl -X GET http://localhost:6543/api/matakuliah/1
echo.
curl -X GET http://localhost:6543/api/matakuliah/1
echo.
echo.

echo ============================================================
echo TEST 7: GET - Verifikasi Setelah Delete
echo ============================================================
echo curl -X GET http://localhost:6543/api/matakuliah
echo.
curl -X GET http://localhost:6543/api/matakuliah
echo.

pause
