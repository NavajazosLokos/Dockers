# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
