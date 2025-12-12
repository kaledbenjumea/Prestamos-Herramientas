// Importamos Router desde express para crear un conjunto de rutas
const { Router } = require('express');

// Importamos el controlador de herramientas donde están las funciones (getAll, getById, etc.)
const ctrl = require('../controllers/herramientas.controller');

// Creamos una instancia de Router
const router = Router();

/* 
 📌 Definición de rutas REST para herramientas
 Cada ruta se conecta con una función del controlador
*/

// Ruta GET /herramientas → lista todas las herramientas
router.get('/', ctrl.getAll);

// Ruta GET /herramientas/:id → obtiene una herramienta específica por su ID
router.get('/:id', ctrl.getById);

// Ruta POST /herramientas → crea una nueva herramienta
router.post('/', ctrl.create);

// Ruta PUT /herramientas/:id → actualiza una herramienta existente por su ID
router.put('/:id', ctrl.update);

// Ruta DELETE /herramientas/:id → elimina una herramienta por su ID
router.delete('/:id', ctrl.remove);

// Exportamos el router para usarlo en app.js o server.js
module.exports = router;
