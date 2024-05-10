# Utiliza una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de tu aplicación
COPY . .

# Especifica el puerto en el que tu aplicación va a escuchar (ajusta según sea necesario)
EXPOSE 3000

# Especifica el comando para iniciar tu aplicación
CMD ["node", "index.js"]
