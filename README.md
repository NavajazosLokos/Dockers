docker-compose.yml

Este archivo docker-compose.yml define la estructura de un sistema con múltiples contenedores para una aplicación
web compuesta por frontend, backend y base de datos, usando la versión 3.8 de Docker Compose.

---------------------------------------------------------------------------------------------------------------------------------------------
webapp-db:  # Cambié de 'db' a 'webapp-db'
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: 1234  # Contraseña correcta según el ejemplo
      MYSQL_DATABASE: webapp  # La base de datos a utilizar
    ports:
      - "3307:3306"
    networks:
      - mi_red

webapp-db (MySQL)
Este servicio utiliza la imagen oficial de MySQL 5.7 para levantar una base de datos.

image: Se usa mysql:5.7, una versión estable y compatible.

environment: Define variables como la contraseña del root (1234) y el nombre de la base de datos (webapp).

ports: Expone el puerto interno 3306 de MySQL al puerto 3307 en el host local, para evitar conflictos con otras instancias de MySQL.

networks: Está conectado a una red personalizada llamada mi_red.


--------------------------------------------------------------------------------------------------------------------------------------------

backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DB_HOST: webapp-db
      DB_PORT: 3306       
      DB_USER: root
      DB_PASSWORD: 1234
      DB_NAME: webapp
    depends_on:
      - webapp-db
    networks:
      - mi_red

backend (API REST Node.js)
Este servicio representa la parte lógica del sistema.

build: Construye la imagen desde el directorio ./backend, que contiene el código del servidor (por ejemplo, un backend en Node.js con Express).

ports: Expone el puerto 3000 al host para acceder a la API.

environment: Configura las credenciales y detalles para conectarse al servicio webapp-db como:

Host: webapp-db (el nombre del servicio de MySQL)

Puerto: 3306

Usuario: root

Contraseña: 1234

Base de datos: webapp

depends_on: Indica que este servicio debe iniciarse después de que la base de datos esté lista.

networks: También está en la red mi_red.


--------------------------------------------------------------------------------------------------------------------------------------------

frontend:
    image: nginx:alpine
    build: ./frontend
    ports:
      - "80:80"
    networks:
      - mi_red

frontend (Nginx)
Este servicio sirve la parte visual de la aplicación.

image: Usa nginx:alpine, una versión ligera y eficiente.

build: Construye desde el directorio ./frontend, donde está el contenido HTML/CSS/JS.

ports: Expone el puerto 80 al host, permitiendo el acceso vía navegador.

networks: Está conectado a la misma red que los demás servicios.
--------------------------------------------------------------------------------------------------------------------------------------------

volumes:
  db_data:

networks:
  mi_red:
    driver: bridge

networks: Crea una red personalizada llamada mi_red con el controlador 
bridge. Esto permite que los servicios se comuniquen entre sí por nombre.

volumes: Aunque se define un volumen db_data, no se está usando explícitamente en este fragmento. 
Se puede utilizar para persistencia de datos si se añade a webapp-db.
