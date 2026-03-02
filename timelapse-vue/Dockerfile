# Usa AS en mayúsculas para evitar los avisos de "Casing"
FROM node:lts-alpine AS build-stage

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos todas las dependencias
RUN npm install

# Instalamos npm-run-all de forma global para que el comando 'run-p' esté disponible
RUN npm install -g npm-run-all

COPY . .

# URL del API inyectada en tiempo de build (desde docker-compose args)
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

# Ahora 'run-p' será reconocido y VITE_API_URL estará disponible para Vite
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]