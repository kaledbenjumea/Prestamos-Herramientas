// Importamos las librerías necesarias
const express = require('express'); // Framework para crear el servidor y manejar rutas
const cors = require('cors');       // Middleware para permitir peticiones desde otros orígenes (ej. frontend)
require('dotenv').config();         // Carga las variables de entorno desde el archivo .env

// Importamos las rutas de cada módulo
const herramientasRoutes = require('./routes/herramientas.routes');
const vecinosRoutes = require('./routes/vecinos.routes');
const prestamosRoutes = require('./routes/prestamos.routes');

// Creamos la aplicación Express
const app = express();

// Middlewares globales
app.use(cors());           // Habilita CORS para que el frontend pueda consumir la API
app.use(express.json());   // Permite recibir y procesar datos en formato JSON en el body de las peticiones

// Definimos las rutas principales de la API
// Cada grupo de rutas se monta en un prefijo distinto
app.use('/herramientas', herramientasRoutes); // Rutas para gestión de herramientas
app.use('/vecinos', vecinosRoutes);           // Rutas para gestión de vecinos
app.use('/prestamos', prestamosRoutes);       // Rutas para gestión de préstamos

// Definimos el puerto de ejecución (se toma de .env o por defecto 4000)
const port = process.env.PORT || 4000;

// Iniciamos el servidor y mostramos un mensaje en consola
app.listen(port, () => {
  console.log(`API corriendo en puerto ${port}`);
});
