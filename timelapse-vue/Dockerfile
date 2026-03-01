# Usa AS en mayúsculas para evitar los avisos de "Casing"
FROM node:lts-alpine AS build-stage

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos todas las dependencias
RUN npm install

# SOLUCIÓN: Instalamos npm-run-all de forma global para que el comando 'run-p' esté disponible
RUN npm install -g npm-run-all

COPY . .

# Ahora 'run-p' será reconocido
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]