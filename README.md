# Observatorio Estelar
Este proyecto consiste en una aplicación web para el registro y consulta de observaciones astronómicas. La arquitectura del proyecto está basada en contenedores Docker, e incluye múltiples instancias del Frontend y Backend, una base de datos MySQL con replicación y un balanceador de carga con NGINX.

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
docker-compose up --build
```
Este proceso puede tardar unos minutos dependiendo de tu conexión a Internet y la capacidad de tu máquina.

4. **Acceder a la Aplicación**

- **Aplicación Web**: Abre tu navegador y dirígete a `http://localhost`. Aquí NGINX redirige las peticiones a las instancias del Frontend.
- **phpMyAdmin**: Para administrar la base de datos, visita `http://localhost:8080`. Utiliza el usuario y contraseña configurados (por defecto, usuario `root` y contraseña `password`).

5. **Verificar la Replicación y el Balanceo de Carga**

- Realiza alguna observación en la aplicación web y verifica que los datos se registren correctamente en la base de datos.
- Si deseas comprobar la distribución de carga, puedes acceder varias veces a la aplicación y ver en consola o en la interfaz de usuario cuál instancia del Frontend o Backend está respondiendo.

6. **Detener los Contenedores**

Para detener y eliminar los contenedores, puedes presionar Ctrl + C en la terminal donde se ejecuta docker-compose y luego correr:

```
docker-compose down
```
