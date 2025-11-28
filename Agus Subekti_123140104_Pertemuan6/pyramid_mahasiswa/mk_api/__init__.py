from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
import zope.sqlalchemy

# Import model agar ter-register
from .models.meta import Base
from .models.matakuliah import Matakuliah 

def get_tm_session(session_factory, transaction_manager):
    """
    Membuat session database yang terikat dengan transaction manager Pyramid.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession

def main(global_config, **settings):
    """ Function utama yang mengembalikan aplikasi WSGI Pyramid. """
    
    # Setup Database Engine
    engine = engine_from_config(settings, 'sqlalchemy.')
    
    # Setup Session Factory
    session_factory = sessionmaker(bind=engine)
    
    # Konfigurasi Pyramid
    with Configurator(settings=settings) as config:
        config.include('pyramid_tm') # Transaction Manager
        config.include('pyramid_retry') # Retry jika terjadi conflict DB
        
        # Menambahkan method request.dbsession
        config.add_request_method(
            lambda r: get_tm_session(session_factory, r.tm),
            'dbsession',
            reify=True
        )

        # Include Routes
        config.include('.routes')
        
        # Scan folder views untuk dekorator @view_config
        config.scan('.views')
        
    return config.make_wsgi_app()