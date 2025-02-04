const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'db', // Nombre del servicio en docker-compose.yml
  user: 'root',
  password: 'password',
  database: 'observatorio_estelar' // Nuevo nombre de base de datos relacionado con el tema astronómico
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Manejar errores de conexión
db.on('error', err => {
  console.error('Error en la base de datos:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Reconectar si la conexión se pierde
    db.connect();
  } else {
    throw err;
  }
});

// Nueva ruta para registrar observaciones astronómicas
app.post('/api/observaciones', (req, res) => {
  // Se esperan los siguientes datos en el cuerpo de la petición:
  // objetoCeleste, fechaObservacion, ubicacion, nombreObservador, comentarios
  const { objetoCeleste, fechaObservacion, ubicacion, nombreObservador, comentarios } = req.body;
  console.log(objetoCeleste, fechaObservacion, ubicacion, nombreObservador, comentarios);
  
  // Insertar los datos en la tabla "observaciones" con campos adaptados al tema
  const query = `
    INSERT INTO observaciones (objeto_celeste, fecha_observacion, ubicacion, nombre_observador, comentarios)
    VALUES (?, ?, ?, ?, ?)
  `;
  console.log(query);
  
  db.query(query, [objetoCeleste, fechaObservacion, ubicacion, nombreObservador, comentarios], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al guardar los datos');
      return;
    }
    res.status(200).json({
      message: 'Datos guardados correctamente',
      instance: process.env.INSTANCE_ID,
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});