Archivo docker-compose.yml
---------------------------------------------------------------------------------------------------------------------------------------------

Este archivo docker-compose.yml define la estructura de un sistema con múltiples contenedores para una aplicación
web compuesta por frontend, backend y base de datos, usando la versión 3.8 de Docker Compose.

BASE DE DATOS (MYSQL)
---------------------------------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/99b2bf7c-a840-42c2-bb01-be9e571de6b0)


webapp-db (MySQL)
Este servicio utiliza la imagen oficial de MySQL 5.7 para levantar una base de datos.

image: Se usa mysql:5.7, una versión estable y compatible.

environment: Define variables como la contraseña del root (1234) y el nombre de la base de datos (webapp).

ports: Expone el puerto interno 3306 de MySQL al puerto 3307 en el host local, para evitar conflictos con otras instancias de MySQL.

networks: Está conectado a una red personalizada llamada mi_red.

BACKEND (DOCKER)
---------------------------------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/0f8682c6-9edc-4bf1-af5e-30d174b08498)


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

FRONTEND (DOCKER)
--------------------------------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/7737fbda-da2d-4dba-b01f-0a61014ba618)


frontend (Nginx)
Este servicio sirve la parte visual de la aplicación.

image: Usa nginx:alpine, una versión ligera y eficiente.

build: Construye desde el directorio ./frontend, donde está el contenido HTML/CSS/JS.

ports: Expone el puerto 80 al host, permitiendo el acceso vía navegador.

networks: Está conectado a la misma red que los demás servicios.

RED Y VOLUMEN
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


Paginas HTML
--------------------------------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/8d3cbbf4-02e3-49ff-8937-c938ec7a9f23)

PAGINA DE REGISTRO
![image](https://github.com/user-attachments/assets/e2ca10ee-e366-4f8a-b15c-78fbb047bc27)

podemos ver que al llenar el formulario del registro, este indica que se registro con exito y se guardo en la base de datos local del docker MYSQL

![image](https://github.com/user-attachments/assets/fecbe7d0-941d-4a0f-b604-3ebab6379eb6)

El dato se ve reflejado en la tabla de registros como lo podemos ver, al entrar a la pantalla de login y ponemos los datos que escribimos anteriormente
Podemos observar que puede entrar a otra pagina.html donde verifica que si se pudo validar la informacion del login

![image](https://github.com/user-attachments/assets/3ee2b7c4-8d00-4644-9474-aab1e7fc78b9)

el conjunto de docker se construye con el 
docker-compose up --build -d 
y el -d para que la terminal la puedas usar, esto lo puedes hacer despues de verificar que los console.log te indique esta bien la conexion.
esto para ahorrar una pestaña de terminal.

para la base de datos solo se uso esta tabla

CREATE TABLE registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(50) NOT NULL,
  nickname VARCHAR(30) NOT NULL,
  password VARCHAR(20) NOT NULL,
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

Apesar de ser algo corto, tuvo muchas dificultades con los dockers, esto se deba mas que soy nuevo en esto. 
experimentando algunas cosas sobre estos



