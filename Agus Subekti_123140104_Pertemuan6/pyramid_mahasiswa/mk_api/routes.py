def includeme(config):
    config.add_route('home', '/')  # Root route
    config.add_route('matakuliah_collection', '/api/matakuliah') # GET, POST
    config.add_route('matakuliah_item', '/api/matakuliah/{id}')  # GET, PUT, DELETE