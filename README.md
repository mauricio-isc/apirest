📦 InventoryPro – Sistema de Gestión de Inventarios
📚 Tabla de Contenidos

✨ Características Principales

🎯 Funcionalidades

🎨 Diseño Corporativo

📊 Dashboard Ejecutivo

🚀 Tecnologías Utilizadas

Backend

Frontend

📦 Instalación y Configuración

🔑 Prerrequisitos

1. Clonar el Repositorio

🐳 Despliegue con Docker

2. Levantar los Servicios con Docker Compose

3. Comandos Útiles de Docker

⚙️ Variables de Entorno

🌐 Puertos Expuestos

🐳 Estructura de Contenedores

🐳 Volúmenes Persistentes

🐳 Health Checks y Monitoreo

🐳 Despliegue en Producción

🐳 Configuración de Redes

✅ Ventajas del Deployment con Docker

🐳 Solución de Problemas

🐳 Ejemplo de Docker Compose (Desarrollo)

✨ Características Principales
🎯 Funcionalidades

CRUD Completo de productos

Dashboard ejecutivo con métricas en tiempo real

Interfaz responsive adaptable a dispositivos móviles

Validaciones de datos robustas

API REST bien documentada

Panel de administración Django integrado

🎨 Diseño Corporativo

Interfaz empresarial moderna y profesional

Paleta de colores corporativa azul

Animaciones sutiles y transiciones fluidas

Tipografía Inter para mejor legibilidad

Componentes modulares y reutilizables

📊 Dashboard Ejecutivo

📦 Total de productos en inventario

💰 Valor total del inventario

📊 Unidades en stock disponibles

📈 Métricas visuales en tiempo real

🚀 Tecnologías Utilizadas
Backend

Django 4.2.5 – Framework web Python

Django REST Framework – API REST

Django CORS Headers – Manejo de CORS

PostgreSQL – Base de datos (opcional SQLite)

Python 3.13 – Lenguaje de programación

Frontend

React 18.2.0 – Biblioteca de interfaz de usuario

TypeScript 5.0 – JavaScript tipado

Axios – Cliente HTTP para APIs

CSS3 – Estilos con diseño moderno

HTML5 – Estructura semántica

📦 Instalación y Configuración
🔑 Prerrequisitos

Python 3.8+

Node.js 16+

PostgreSQL (opcional)

pip y npm

Docker Engine 20.10+

Docker Compose 2.0+

1. Clonar el Repositorio
git clone https://github.com/mauricio-isc/sistema-de-gestion-de-inventarios.git
cd sistema-de-gestion-de-inventarios

🐳 Despliegue con Docker
2. Levantar los Servicios con Docker Compose
docker-compose up -d --build
docker-compose ps
docker-compose logs -f
docker-compose down

3. Comandos Útiles de Docker
docker-compose exec db psql -U django -d inventorypro
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose logs backend
docker-compose logs frontend
docker-compose exec backend bash
docker-compose exec frontend sh

⚙️ Variables de Entorno

Archivo .env en la raíz del proyecto:

# Database
DB_NAME=inventorypro
DB_USER=django
DB_PASSWORD=django123
DB_HOST=db
DB_PORT=5432

# Django
SECRET_KEY=tu-clave-secreta-muy-segura-aqui
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# React
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME=InventoryPro

🌐 Puertos Expuestos

Frontend React: http://localhost:3000

Backend Django: http://localhost:8000

Admin Django: http://localhost:8000/admin

PostgreSQL: localhost:5432

🐳 Estructura de Contenedores
Backend (Django)
FROM python:3.11-slim
# - Instalación de dependencias del sistema
# - Configuración de PostgreSQL
# - Script de entrypoint automático
# - Migraciones automáticas al iniciar

Frontend (React)
FROM node:18-alpine as build
# - Build optimizado de producción
# - Servido con Nginx
# - Configuración de reverse proxy

Base de Datos (PostgreSQL)
image: postgres:13-alpine
# - Volumen persistente para datos
# - Health checks automáticos
# - Configuración optimizada

🐳 Volúmenes Persistentes
volumes:
  postgres_data:   # Datos de PostgreSQL
  static_volume:   # Archivos estáticos

🐳 Health Checks y Monitoreo
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U django"]
  interval: 10s
  timeout: 5s
  retries: 5

🐳 Despliegue en Producción
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml ps

🐳 Configuración de Redes
networks:
  inventorypro_network:
    driver: bridge

✅ Ventajas del Deployment con Docker

Consistencia – Mismo entorno en desarrollo y producción

Aislamiento – Servicios independientes y seguros

Escalabilidad – Fácil escalado horizontal

Portabilidad – Funciona en cualquier sistema con Docker

Versionado – Control de versiones de cada servicio

🐳 Solución de Problemas
docker stats
docker system prune
docker network inspect inventorypro_network
docker-compose exec db pg_dump -U django inventorypro > backup.sql

🐳 Ejemplo de Docker Compose (Desarrollo)
version: '3.8'
services:
  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: inventorypro
      POSTGRES_USER: django
      POSTGRES_PASSWORD: django123
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DEBUG: "True"
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app