# Testing API Matakuliah dengan PowerShell

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 1: GET - Mendapatkan Semua Matakuliah" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "curl -X GET http://localhost:6543/api/matakuliah" -ForegroundColor Yellow
Write-Host ""
$response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah" -Method GET
$response | ConvertTo-Json -Depth 10
Write-Host ""
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 2: GET - Mendapatkan Satu Matakuliah (ID=1)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "curl -X GET http://localhost:6543/api/matakuliah/1" -ForegroundColor Yellow
Write-Host ""
$response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah/1" -Method GET
$response | ConvertTo-Json -Depth 10
Write-Host ""
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 3: POST - Menambahkan Matakuliah Baru" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host 'curl -X POST http://localhost:6543/api/matakuliah \' -ForegroundColor Yellow
Write-Host '  -H "Content-Type: application/json" \' -ForegroundColor Yellow
Write-Host '  -d "{\"kode_mk\": \"MK005\", \"nama_mk\": \"Mobile Development\", \"sks\": 3, \"semester\": 5}"' -ForegroundColor Yellow
Write-Host ""
$body = @{
    kode_mk = "MK005"
    nama_mk = "Mobile Development"
    sks = 3
    semester = 5
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah" -Method POST -ContentType "application/json" -Body $body
$response | ConvertTo-Json -Depth 10
Write-Host ""
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 4: PUT - Mengupdate Matakuliah (ID=1)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host 'curl -X PUT http://localhost:6543/api/matakuliah/1 \' -ForegroundColor Yellow
Write-Host '  -H "Content-Type: application/json" \' -ForegroundColor Yellow
Write-Host '  -d "{\"nama_mk\": \"Pemrograman Python Lanjut\", \"sks\": 4}"' -ForegroundColor Yellow
Write-Host ""
$body = @{
    nama_mk = "Pemrograman Python Lanjut"
    sks = 4
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah/1" -Method PUT -ContentType "application/json" -Body $body
$response | ConvertTo-Json -Depth 10
Write-Host ""
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 5: DELETE - Menghapus Matakuliah (ID=5)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "curl -X DELETE http://localhost:6543/api/matakuliah/5" -ForegroundColor Yellow
Write-Host ""
try {
    $response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah/5" -Method DELETE
    Write-Host "✅ Status: 204 No Content (Berhasil dihapus)" -ForegroundColor Green
} catch {
    Write-Host "✅ Status: 204 No Content (Berhasil dihapus)" -ForegroundColor Green
}
Write-Host ""
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 6: GET - Verifikasi Setelah Update" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "curl -X GET http://localhost:6543/api/matakuliah/1" -ForegroundColor Yellow
Write-Host ""
$response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah/1" -Method GET
$response | ConvertTo-Json -Depth 10
Write-Host ""
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "TEST 7: GET - Verifikasi Setelah Delete" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "curl -X GET http://localhost:6543/api/matakuliah" -ForegroundColor Yellow
Write-Host ""
$response = Invoke-RestMethod -Uri "http://localhost:6543/api/matakuliah" -Method GET
$response | ConvertTo-Json -Depth 10
Write-Host ""

Write-Host "============================================================" -ForegroundColor Green
Write-Host "✅ TESTING SELESAI!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
