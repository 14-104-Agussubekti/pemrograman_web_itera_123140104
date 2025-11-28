"""
Script untuk testing semua endpoint API
"""
import requests
import json
import uuid

BASE_URL = "http://localhost:6543"

def print_response(title, method, url, response, data=None):
    """Helper untuk print response dengan format yang rapi"""
    print(f"\n{'='*70}")
    print(f"📌 {title}")
    print(f"{'='*70}")
    print(f"🔹 Method: {method}")
    print(f"🔹 URL: {url}")
    if data:
        print(f"🔹 Request Body: {json.dumps(data, indent=2)}")
    print(f"🔹 Status Code: {response.status_code}")
    print(f"🔹 Response:")
    try:
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    except:
        print(response.text)

print("\n" + "="*70)
print("🚀 TESTING API MATAKULIAH")
print("="*70)

# Test 1: GET Home
print("\n[1/7] Testing GET /")
try:
    response = requests.get(f"{BASE_URL}/")
    print_response("GET Home", "GET", f"{BASE_URL}/", response)
    assert response.status_code == 200, "Expected 200"
    print("✅ PASS")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Test 2: GET All Matakuliah
print("\n[2/7] Testing GET /api/matakuliah")
try:
    response = requests.get(f"{BASE_URL}/api/matakuliah")
    print_response("GET All Matakuliah", "GET", f"{BASE_URL}/api/matakuliah", response)
    assert response.status_code == 200, "Expected 200"
    data = response.json()
    assert isinstance(data, list), "Expected array"
    assert len(data) >= 3, "Expected at least 3 items"
    print("✅ PASS")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Test 3: GET One Matakuliah
print("\n[3/7] Testing GET /api/matakuliah/1")
try:
    response = requests.get(f"{BASE_URL}/api/matakuliah/1")
    print_response("GET One Matakuliah (ID=1)", "GET", f"{BASE_URL}/api/matakuliah/1", response)
    assert response.status_code == 200, "Expected 200"
    data = response.json()
    assert data['id'] == 1, "Expected ID 1"
    assert data['kode_mk'] == 'MK001', "Expected kode_mk = MK001"
    print("✅ PASS")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Test 4: POST Create New Matakuliah
print("\n[4/7] Testing POST /api/matakuliah")
new_code = f"MK{uuid.uuid4().hex[:6].upper()}"
new_mk_data = {
    "kode_mk": new_code,
    "nama_mk": "Web Development",
    "sks": 4,
    "semester": 4
}
try:
    response = requests.post(
        f"{BASE_URL}/api/matakuliah",
        json=new_mk_data,
        headers={"Content-Type": "application/json"}
    )
    print_response("POST Create Matakuliah", "POST", f"{BASE_URL}/api/matakuliah", response, new_mk_data)
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    data = response.json()
    assert data['kode_mk'] == new_code, f"Expected kode_mk = {new_code}"
    new_id = data['id']
    print(f"✅ PASS (New ID: {new_id})")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Test 5: PUT Update Matakuliah
print("\n[5/7] Testing PUT /api/matakuliah/1")
update_data = {
    "nama_mk": "Pemrograman Python (Updated)",
    "sks": 4
}
try:
    response = requests.put(
        f"{BASE_URL}/api/matakuliah/1",
        json=update_data,
        headers={"Content-Type": "application/json"}
    )
    print_response("PUT Update Matakuliah (ID=1)", "PUT", f"{BASE_URL}/api/matakuliah/1", response, update_data)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data['nama_mk'] == 'Pemrograman Python (Updated)', "Expected updated nama_mk"
    assert data['sks'] == 4, "Expected updated sks = 4"
    print("✅ PASS")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Test 6: GET One Matakuliah (verify update)
print("\n[6/7] Testing GET /api/matakuliah/1 (Verify Update)")
try:
    response = requests.get(f"{BASE_URL}/api/matakuliah/1")
    print_response("GET One Matakuliah (ID=1) - Verify", "GET", f"{BASE_URL}/api/matakuliah/1", response)
    assert response.status_code == 200, "Expected 200"
    data = response.json()
    assert data['nama_mk'] == 'Pemrograman Python (Updated)', "Update verification failed"
    print("✅ PASS - Update verified")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Test 7: DELETE Matakuliah
print("\n[7/7] Testing DELETE Matakuliah (use created ID if available)")
try:
    # Determine which ID to delete: prefer the one returned by POST (new_id)
    delete_id = globals().get('new_id')
    if not delete_id:
        # fallback to last item from GET /api/matakuliah
        resp_all = requests.get(f"{BASE_URL}/api/matakuliah")
        resp_all.raise_for_status()
        items = resp_all.json()
        if not items:
            raise Exception('No matakuliah available to delete')
        delete_id = items[-1]['id']

    response = requests.delete(f"{BASE_URL}/api/matakuliah/{delete_id}")
    print_response(f"DELETE Matakuliah (ID={delete_id})", "DELETE", f"{BASE_URL}/api/matakuliah/{delete_id}", response)
    assert response.status_code == 204, f"Expected 204, got {response.status_code}"
    print("✅ PASS")
except Exception as e:
    print(f"❌ FAIL: {e}")

# Verification: GET All after delete
print("\n[BONUS] Testing GET /api/matakuliah (Verify Delete)")
try:
    response = requests.get(f"{BASE_URL}/api/matakuliah")
    print_response("GET All Matakuliah - Verify Delete", "GET", f"{BASE_URL}/api/matakuliah", response)
    data = response.json()
    print(f"✅ Total items: {len(data)} (should be 3 after deletion)")
except Exception as e:
    print(f"❌ FAIL: {e}")

print("\n" + "="*70)
print("🎉 TESTING SELESAI!")
print("="*70 + "\n")
