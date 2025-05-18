const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de conexión MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'webapp-db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'webapp',
  port: process.env.DB_PORT || 3306
};

function connectWithRetry(retries = 10, delay = 3000) {
  const db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error(`❌ Error al conectar a la base de datos (${retries} reintentos restantes):`, err.message);
      if (retries > 0) {
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      } else {
        console.error('❌ No se pudo conectar a la base de datos después de varios intentos.');
        process.exit(1);
      }
    } else {
      console.log('✅ Conexión exitosa a la base de datos');

      // Ruta para registro
      app.post('/api/registro', (req, res) => {
        const { correo, nickname, password } = req.body;
        if (!correo || !nickname || !password) {
          return res.status(400).json({ error: 'Faltan campos' });
        }

        const sql = 'INSERT INTO registros (correo, nickname, password) VALUES (?, ?, ?)';
        db.query(sql, [correo, nickname, password], (err, result) => {
          if (err) {
            console.error('❌ Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
          }

          console.log('✅ Registro exitoso:', result);
          res.status(200).json({ message: '✅ Registro exitoso' });
        });
      });

      // Ruta para login
      app.post('/api/login', (req, res) => {
        const { correo, password } = req.body;

        if (!correo || !password) {
          return res.status(400).json({ error: 'Faltan campos' });
        }

        const sql = 'SELECT * FROM registros WHERE correo = ? AND password = ?';
        db.query(sql, [correo, password], (err, results) => {
          if (err) {
            console.error('❌ Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
          }

          if (results.length > 0) {
            res.status(200).json({ message: '✅ Usuario autenticado' });
          } else {
            res.status(401).json({ error: '❌ Usuario o contraseña incorrectos' });
          }
        });
      });

      app.listen(port, () => {
        console.log(`✅ Backend corriendo en http://localhost:${port}`);
      });
    }
  });
}

connectWithRetry();
