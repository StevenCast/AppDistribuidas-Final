# Observatorio Estelar
Este proyecto consiste en una aplicación web para el registro y consulta de observaciones astronómicas. La arquitectura del proyecto está basada en contenedores Docker, e incluye múltiples instancias del Frontend y Backend, una base de datos MySQL con replicación y un balanceador de carga con NGINX.

![image](https://github.com/user-attachments/assets/73ea9931-3f65-492c-855e-d01bbed51d08)


## Requisitos Previos 
Antes de ejecutar el proyecto, asegúrate de tener instalado en tu sistema:
- Docker
- Docker Compose

## Estructura del Proyecto
- **Frontend**: Aplicación web desarrollada en React. Varias instancias se despliegan para mayor escalabilidad.
- **Backend**: API desarrollada en Node.js que gestiona la lógica de negocio y se conecta a la base de datos.
- **Base de Datos**: MySQL configurada en modo maestro-esclavo para la replicación de datos.
- **NGINX**: Balanceador de carga que distribuye el tráfico entre las instancias de Frontend y Backend.
- **phpMyAdmin**: Herramienta para la administración de la base de datos MySQL.


## Pasos para Ejecutar el Proyecto
Sigue estos pasos para poner en funcionamiento el proyecto:
1. **Clonar el Repositorio**

Abre una terminal y clona el repositorio en tu máquina local:
```
git clone https://github.com/StevenCast/AppDistribuidas-Final.git
cd observatorio-estelar
```

2. **Configurar el Archivo docker-compose.yml**

Revisa y, si es necesario, ajusta el archivo `docker-compose.yml` para tu entorno. Asegúrate de que los puertos no estén siendo utilizados por otros servicios en tu máquina.

3. **Construir y Levantar los Contenedores**

Desde la raíz del proyecto, ejecuta el siguiente comando para construir las imágenes y levantar los contenedores:
```
docker-compose up
```
Este proceso puede tardar unos minutos dependiendo de tu conexión a Internet y la capacidad de tu máquina.

- ***Importante configurar***
  - Sera esencial ejecutar los siguientes comandos para la correcta configuración de la base de datos, Por ello se debe acceder a `phpMyAdmin` al siguiente puerto `http://localhost:8080`. Utiliza el usuario y contraseña configurados (por defecto, usuario `root` y contraseña `password`). :

Comando para la creación de la tabla `observaciones`, es necesaria en ambas bases de datos:
```
CREATE TABLE observaciones (
  id INT NOT NULL AUTO_INCREMENT,
  objeto_celeste VARCHAR(50) NOT NULL,
  fecha_observacion DATE NOT NULL,
  ubicacion VARCHAR(100) NOT NULL,
  nombre_observador VARCHAR(50) NOT NULL,
  comentarios TEXT,
  PRIMARY KEY (id)
) ENGINE = InnoDB;
```
* Base principal:
![image](https://github.com/user-attachments/assets/75d6e343-8c87-4650-ba50-3eb7f2fb278c)

* Base réplica:
![image](https://github.com/user-attachments/assets/c22b866b-0356-4bb5-b143-8fc6fcf1cab6)


Para la base principal se ejecuta este comando:
```
SHOW MASTER STATUS
```
Para la replica se ejecutan estos comandos, la información puede variar dependiendo de lo mostrado en el comando ejecutado anteriormente en la base principal
```
CHANGE MASTER to MASTER_HOST = 'db', MASTER_USER = 'root', MASTER_PASSWORD = 'password';
CHANGE MASTER TO MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 161;
START SLAVE;
SHOW SLAVE STATUS;
```
Para volver a construir los contenedores:
```
docker-compose up --build
```

4. **Acceder a la Aplicación**

- **Aplicación Web**: Abre tu navegador y dirígete a `http://localhost`. Aquí NGINX redirige las peticiones a las instancias del Frontend.

5. **Verificar la Replicación y el Balanceo de Carga**

- Realiza alguna observación en la aplicación web y verifica que los datos se registren correctamente en la base de datos.
- Si deseas comprobar la distribución de carga, puedes acceder varias veces a la aplicación y ver en consola o en la interfaz de usuario cuál instancia del Frontend o Backend está respondiendo.

6. **Detener los Contenedores**

Para detener y eliminar los contenedores, puedes presionar Ctrl + C en la terminal donde se ejecuta docker-compose y luego correr:

```
docker-compose down
```
