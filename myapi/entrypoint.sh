#!/bin/sh

#Este script se ejecuta cuando el contenedor inicia 
echo " Iniciando el contenedor de Django"

#Esperar a que PostgreSQL este listo

echo " Esperando a PostgreSQL en $DB_HOST:$DB_PORT..."
while ! nc -z $DB_HOST $DB_PORT; do 
    sleep 0.5
done
echo "PostgreSQL esta listo!"

#Ejecutar las migraciones
echo "aplicando migraciones de base de datos..."
python manage.py migrate

#Crear superusuario en caso de que no exista
echo "verificando superusuario..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.object.create_superuser('admin', 'admin@inventorypro.com', 'admin123')
    print(' Superusuario creado: admin/admin123')
    else:
    print('el superusuario ya existe')
 "
#Colectar archivos estaticos
echo " Colectando archivos estaticos"
python manage.py collectstatic --noinput

#Iniciar servidor django
echo "Servidor Django iniciado en http://0.0.0.0:8000"
exec python manage.py runserver 0.0.0.0:8000
