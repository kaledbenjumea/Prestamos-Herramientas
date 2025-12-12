// Importamos la conexión a la base de datos desde el archivo db.js
const pool = require('../db');

// ✅ Listar todos los préstamos con JOIN
const getAll = async (req, res) => {
  try {
    // Consulta SQL que une préstamos con vecinos y herramientas
    const { rows } = await pool.query(`
      SELECT p.id, p.fecha_prestamo, p.fecha_devolucion, p.observaciones,
             v.nombre_completo AS vecino,
             h.nombre AS herramienta
      FROM prestamos p
      JOIN vecinos v ON p.vecino_id = v.id
      JOIN herramientas h ON p.herramienta_id = h.id
      ORDER BY p.id ASC
    `);
    // Respondemos con todos los préstamos en formato JSON
    res.json(rows);
  } catch (error) {
    console.error('Error al listar préstamos', error);
    res.status(500).json({ error: 'Error al listar préstamos' });
  }
};

// ✅ Obtener préstamo por ID
const getById = async (req, res) => {
  const { id } = req.params; // Capturamos el id desde la URL
  try {
    // Consulta SQL para buscar préstamo por id
    const { rows } = await pool.query('SELECT * FROM prestamos WHERE id = $1', [id]);
    // Si no existe, devolvemos error 404
    if (rows.length === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    // Si existe, devolvemos el préstamo
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener préstamo', error);
    res.status(500).json({ error: 'Error al obtener préstamo' });
  }
};

// ✅ Crear préstamo
const create = async (req, res) => {
  // Capturamos los datos enviados en el body
  const { vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones } = req.body;
  try {
    // Insertamos un nuevo préstamo en la base de datos
    const { rows } = await pool.query(
      `INSERT INTO prestamos (vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones]
    );
    // Respondemos con el préstamo creado y código 201 (creado)
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al crear préstamo', error);
    res.status(500).json({ error: 'Error al crear préstamo' });
  }
};

// ✅ Actualizar préstamo
const update = async (req, res) => {
  const { id } = req.params; // ID del préstamo a actualizar
  const { vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones } = req.body;
  try {
    // Actualizamos el préstamo con los nuevos datos
    const { rows } = await pool.query(
      `UPDATE prestamos SET vecino_id=$1, herramienta_id=$2, fecha_prestamo=$3, fecha_devolucion=$4, observaciones=$5
       WHERE id=$6 RETURNING *`,
      [vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones, id]
    );
    // Respondemos con el préstamo actualizado
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al actualizar préstamo', error);
    res.status(500).json({ error: 'Error al actualizar préstamo' });
  }
};

// ✅ Marcar préstamo como devuelto
const devolver = async (req, res) => {
  const { id } = req.params; // ID del préstamo a marcar como devuelto
  try {
    // Actualizamos la fecha_devolucion al día actual
    const { rows } = await pool.query(
      `UPDATE prestamos 
       SET fecha_devolucion = CURRENT_DATE 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    // Si no existe el préstamo, devolvemos 404
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    // Respondemos con el préstamo actualizado (ya devuelto)
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al devolver préstamo', error);
    res.status(500).json({ error: 'Error al devolver préstamo' });
  }
};

// ✅ Eliminar préstamo
const remove = async (req, res) => {
  const { id } = req.params; // ID del préstamo a eliminar
  try {
    // Eliminamos el préstamo de la base de datos
    await pool.query('DELETE FROM prestamos WHERE id = $1', [id]);
    // Respondemos con código 204 (sin contenido) si se elimina correctamente
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar préstamo', error);
    res.status(500).json({ error: 'Error al eliminar préstamo' });
  }
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = {
  getAll,
  getById,
  create,
  update,
  devolver,   // 👈 función para marcar préstamo como devuelto
  remove
};
