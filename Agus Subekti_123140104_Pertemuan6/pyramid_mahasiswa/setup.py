from setuptools import setup, find_packages

requires = [
    'plaster_pastedeploy',
    'pyramid',
    'pyramid_retry',
    'pyramid_tm',
    'SQLAlchemy',
    'psycopg2-binary',
    'zope.sqlalchemy',
    'waitress',
]

setup(
    name='mk_api',
    version='0.1',
    packages=find_packages(),
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = mk_api:main',
        ],
    },
)