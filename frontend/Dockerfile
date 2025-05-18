# Usar una imagen base de Nginx
FROM nginx:alpine

# Copiar los archivos del frontend en el directorio de Nginx
COPY ./public /usr/share/nginx/html

# Exponer el puerto 80 para que se pueda acceder al servidor web
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
