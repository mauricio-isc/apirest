# Stage 1 - build
FROM node:18-alphine as build

WORKDIR /app

#  Copiar package files
COPY package*.json ./

#Instalar dependencias
RUN npm ci --only=production

#Copiar codigo fuente
COPY . .

#Build de la aplicacion
RUN npm run build

#Stage 2 - produccion
FROM nginx:alpine

#Copiar la build de react 
COPY --from=build /app/build /usr/share/nginx/html

#exponer puerto
EXPOSE 80

#comando de inicio
CMD [ "nginx", "-g", "daemon off;"]
