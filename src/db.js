// Importamos el Pool de la librería pg (PostgreSQL para Node.js)
const { Pool } = require('pg');

// Importamos dotenv para poder leer las variables de entorno desde el archivo .env
require('dotenv').config();

// Creamos una nueva instancia de Pool (conexión a la base de datos)
// Cada propiedad se obtiene desde las variables de entorno definidas en tu archivo .env
const pool = new Pool({
  host: process.env.PGHOST,       // Dirección del servidor de la base de datos
  port: process.env.PGPORT,       // Puerto de conexión (por defecto PostgreSQL usa 5432)
  database: process.env.PGDATABASE, // Nombre de la base de datos
  user: process.env.PGUSER,       // Usuario para conectarse
  password: process.env.PGPASSWORD // Contraseña del usuario
});

// Mensaje en consola para confirmar a qué base de datos se está conectando
console.log('Conectando a la base:', process.env.PGDATABASE);

// Exportamos el pool para poder usarlo en otros archivos (controladores, rutas, etc.)
module.exports = pool;
