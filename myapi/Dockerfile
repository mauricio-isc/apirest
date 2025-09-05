# Paso 1 - Imagen base
FROM python:3.11-slim-bullseye

# Paso 2 - Metadatos
LABEL maintainer="mauriciosan0315@gmail.com"
LABEL description="Contenedor Django para InventoryPro"

# Paso 3 - Directorio de trabajo
WORKDIR /app

# Paso 4 - Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Paso 5 - Copiar requirements primero (para cache)
COPY requirements.txt .

# Paso 6 - Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Paso 7 - Copiar código de la aplicación
COPY . .

# Paso 8 - Copiar y dar permisos al entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Paso 9 - Crear usuario no-root
RUN useradd --create-home --shell /bin/bash django
USER django

# Paso 10 - Exponer puerto
EXPOSE 8000

# Paso 11 - Script de inicio
ENTRYPOINT ["/app/entrypoint.sh"]
