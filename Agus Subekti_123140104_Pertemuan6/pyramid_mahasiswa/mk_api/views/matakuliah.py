from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest, HTTPCreated, HTTPNoContent
from sqlalchemy import select
from ..models.matakuliah import Matakuliah

# --- HOME ---
@view_config(route_name='home', request_method='GET', renderer='json')
def home(request):
    return {
        'message': 'API Mata Kuliah - Pyramid',
        'version': '0.1',
        'endpoints': {
            'GET_ALL': 'http://localhost:6543/api/matakuliah',
            'POST': 'http://localhost:6543/api/matakuliah',
            'GET_ONE': 'http://localhost:6543/api/matakuliah/{id}',
            'PUT': 'http://localhost:6543/api/matakuliah/{id}',
            'DELETE': 'http://localhost:6543/api/matakuliah/{id}'
        }
    }

# --- GET ALL ---
@view_config(route_name='matakuliah_collection', request_method='GET', renderer='json')
def get_all_matakuliah(request):
    # Syntax 2.0: execute(select(...))
    query = select(Matakuliah).order_by(Matakuliah.kode_mk)
    result = request.dbsession.execute(query)
    # scalars().all() mengembalikan list object Matakuliah
    matakuliahs = result.scalars().all()
    
    return [mk.to_dict() for mk in matakuliahs]

# --- GET ONE ---
@view_config(route_name='matakuliah_item', request_method='GET', renderer='json')
def get_one_matakuliah(request):
    mk_id = request.matchdict['id']
    
    query = select(Matakuliah).where(Matakuliah.id == int(mk_id))
    result = request.dbsession.execute(query)
    mk = result.scalar_one_or_none()
    
    if mk is None:
        raise HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
        
    return mk.to_dict()

# --- CREATE (POST) ---
@view_config(route_name='matakuliah_collection', request_method='POST', renderer='json')
def create_matakuliah(request):
    try:
        data = request.json_body
        # Validasi sederhana
        if not all(k in data for k in ('kode_mk', 'nama_mk', 'sks', 'semester')):
            raise HTTPBadRequest(json_body={'error': 'Data tidak lengkap'})
            
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        
        request.dbsession.add(new_mk)
        # Flush untuk mendapatkan ID baru sebelum commit (ditangani pyramid_tm)
        request.dbsession.flush() 
        
        request.response.status = 201
        return new_mk.to_dict()
        
    except Exception as e:
        raise HTTPBadRequest(json_body={'error': str(e)})

# --- UPDATE (PUT) ---
@view_config(route_name='matakuliah_item', request_method='PUT', renderer='json')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    data = request.json_body
    
    query = select(Matakuliah).where(Matakuliah.id == int(mk_id))
    mk = request.dbsession.execute(query).scalar_one_or_none()
    
    if mk is None:
        raise HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    # Update attributes
    mk.kode_mk = data.get('kode_mk', mk.kode_mk)
    mk.nama_mk = data.get('nama_mk', mk.nama_mk)
    mk.sks = data.get('sks', mk.sks)
    mk.semester = data.get('semester', mk.semester)
    
    return mk.to_dict()

# --- DELETE ---
@view_config(route_name='matakuliah_item', request_method='DELETE', renderer='json')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    
    query = select(Matakuliah).where(Matakuliah.id == int(mk_id))
    mk = request.dbsession.execute(query).scalar_one_or_none()
    
    if mk is None:
        raise HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
        
    request.dbsession.delete(mk)
    return HTTPNoContent() # 204 No Content