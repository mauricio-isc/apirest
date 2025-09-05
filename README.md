## ✨ Características Principales

### 🎯 Funcionalidades
- **CRUD Completo** de productos
- **Dashboard ejecutivo** con métricas en tiempo real
- **Interfaz responsive** adaptable a dispositivos móviles
- **Validaciones** de datos robustas
- **API REST** bien documentada
- **Panel de administración** Django integrado

### 🎨 Diseño Corporativo
- **Interfaz empresarial** moderna y profesional
- **Paleta de colores** corporativa azul
- **Animaciones sutiles** y transiciones fluidas
- **Tipografía Inter** para mejor legibilidad
- **Componentes modulares** y reutilizables

### 📊 Dashboard Ejecutivo
- 📦 **Total de productos** en inventario
- 💰 **Valor total** del inventario
- 📊 **Unidades en stock** disponibles
- 📈 **Métricas visuales** en tiempo real

## 🚀 Tecnologías Utilizadas

### Backend
- **Django 4.2.5** - Framework web Python
- **Django REST Framework** - API REST
- **Django CORS Headers** - Manejo de CORS
- **PostgreSQL** - Base de datos (opcional SQLite)
- **Python 3.13** - Lenguaje de programación

### Frontend
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.0** - JavaScript tipado
- **Axios** - Cliente HTTP para APIs
- **CSS3** - Estilos con diseño moderno
- **HTML5** - Estructura semántica

## 📦 Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- PostgreSQL (opcional)
- pip y npm

### 1. Clonar el Repositorio
```bash
git clone https://github.com/mauricio-isc/sistema-de-gestion-de-inventarios.git



🐳 Docker Deployment
Contenedores y Orquestación
Docker Containers - Empaquetado de aplicaciones en entornos aislados

Docker Compose - Orquestación de múltiples servicios

PostgreSQL Container - Base de datos en contenedor dedicado

Multi-stage Builds - Builds optimizados para producción

Servicios Configurados
yaml
services:
  db:          # 🐘 PostgreSQL Database
  backend:     # 🐍 Django API
  frontend:    # ⚛️ React Frontend
🐳 Despliegue con Docker
Prerrequisitos
Docker Engine 20.10+

Docker Compose 2.0+


2. Despliegue con Docker Compose
bash
# Construir y ejecutar todos los servicios
docker-compose up -d --build

# Ver el estado de los contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Detener los servicios
docker-compose down
3. Comandos Útiles de Docker
bash
# Acceder a la base de datos
docker-compose exec db psql -U django -d inventorypro

# Ejecutar migraciones manualmente
docker-compose exec backend python manage.py migrate

# Crear superusuario
docker-compose exec backend python manage.py createsuperuser

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend

# Shell en los contenedores
docker-compose exec backend bash
docker-compose exec frontend sh
4. Variables de Entorno para Docker
Crea un archivo .env en la raíz:

env
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
5. Puertos Exponidos
Frontend React: http://localhost:3000

Backend Django: http://localhost:8000

Admin Django: http://localhost:8000/admin

PostgreSQL: localhost:5432

🐳 Estructura de Contenedores
Backend (Django)
dockerfile
FROM python:3.11-slim
# - Instalación de dependencias del sistema
# - Configuración de PostgreSQL
# - Script de entrypoint automático
# - Migraciones automáticas al iniciar
Frontend (React)
dockerfile
FROM node:18-alpine as build
# - Build optimizado de producción
# - Servido con Nginx
# - Configuración de reverse proxy
Base de Datos (PostgreSQL)
yaml
image: postgres:13-alpine
# - Volumen persistente para datos
# - Health checks automáticos
# - Configuración optimizada
🐳 Volúmenes Persistentes
yaml
volumes:
  postgres_data:    # Datos de PostgreSQL
  static_volume:    # Archivos estáticos
  # - Persistencia de datos entre reinicios
  # - Backup automático de base de datos
🐳 Health Checks y Monitoreo
yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U django"]
  interval: 10s
  timeout: 5s
  retries: 5
# - Monitoreo automático de servicios
# - Reinicios automáticos en fallos
🐳 Despliegue en Producción
bash
# Build para producción
docker-compose -f docker-compose.prod.yml build

# Ejecutar en producción
docker-compose -f docker-compose.prod.yml up -d

# Verificar estado
docker-compose -f docker-compose.prod.yml ps
🐳 Configuración de Redes
yaml
networks:
  inventorypro_network:
    driver: bridge
# - Comunicación aislada entre contenedores
# - Seguridad mejorada
🐳 Ventajas del Deployment con Docker
✅ Consistentencia - Mismo entorno en desarrollo y producción

✅ Aislamiento - Servicios independientes y seguros

✅ Escalabilidad - Fácil escalado horizontal

✅ Portabilidad - Funciona en cualquier sistema con Docker

✅ Versionado - Control de versiones de cada servicio

🐳 Solución de Problemas
bash
# Ver uso de recursos
docker stats

# Limpiar recursos no utilizados
docker system prune

# Ver información de la red
docker network inspect inventorypro_network

# Backup de base de datos
docker-compose exec db pg_dump -U django inventorypro > backup.sql
🐳 Ejemplo de Docker Compose para Desarrollo
yaml
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