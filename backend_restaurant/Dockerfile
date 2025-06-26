# Usa imagen base liviana de Node.js
FROM node:lts-alpine

# Crea directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto
RUN npm run build

# Comando para ejecutar el backend
CMD ["node", "dist/main.js"]
