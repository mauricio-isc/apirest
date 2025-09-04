#paso 1 Elegir la imagen base
#Usamos una imagen de python oficial 
#"slim" es mas pequeña, "bullyseye" es la version de debian
FROM python:3.11-slim-bullseye


#paso 2 establecer etiquetas, esto puede ser opcional
LABEL maintainer="mauriciosan0315@gmail.com"
LABEL description="Contenedor Django para InventoryPro"

#paso 3 crear directorio de trabajo
WORKDIR /app

#paso 4 Instalar dependencias del sistema
# Instalamos dependencias que necesitan nuestras dependencias Python
RUN apt-get update && apt-get install -y \   
    gcc \ 
    libpq-dev \ 
    netcat-traditional \ 
    && rm - rf /var/lib/apt/lists/* 

#paso 5 copiar requirements primero (para cache en docker)
COPY requirements.txt . 

#paso 6 instalar las dependencias de python
#--no-cache-dir permite no guardar cache para hacer la imagen mas pequena
RUN pip install --no-cache-dir -r requirements.txt

#paso 7 copiar el codigo de la aplicacion 
COPY . . 

# paso 8 Crear usuario no-root para seguridad
RUN useradd --create-home --shell /bin/bash django 
USER django 

#Paso 9 exponer el puerto
EXPOSE 8000

#paso 10 Script de inicio 
COPY entrypoint.sh . 
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]