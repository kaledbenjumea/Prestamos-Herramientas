// Importamos la conexión a la base de datos desde el archivo db.js
const pool = require('../db');

// ✅ Listar todos los préstamos con JOIN
const getAll = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.id, p.fecha_prestamo, p.fecha_devolucion, p.observaciones,
             v.nombre_completo AS vecino,
             h.nombre AS herramienta
      FROM prestamos p
      JOIN vecinos v ON p.vecino_id = v.id
      JOIN herramientas h ON p.herramienta_id = h.id
      ORDER BY p.id ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al listar préstamos', error);
    res.status(500).json({ error: 'Error al listar préstamos' });
  }
};

// ✅ Obtener préstamo por ID
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM prestamos WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener préstamo', error);
    res.status(500).json({ error: 'Error al obtener préstamo' });
  }
};

// ✅ Crear préstamo (ajustado para frontend camelCase)
const create = async (req, res) => {
  try {
    // Capturamos los datos como los manda el frontend
    const { vecinoId, herramientaId, observaciones } = req.body;

    // Validamos que los campos obligatorios existan
    if (!vecinoId || !herramientaId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Insertamos el préstamo con fecha actual y sin fecha_devolucion
    const { rows } = await pool.query(
      `INSERT INTO prestamos (vecino_id, herramienta_id, fecha_prestamo, observaciones)
       VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *`,
      [vecinoId, herramientaId, observaciones]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al crear préstamo', error);
    res.status(500).json({ error: 'Error al crear préstamo' });
  }
};

// ✅ Actualizar préstamo (mantiene snake_case para uso interno o admin)
const update = async (req, res) => {
  const { id } = req.params;
  const { vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE prestamos SET vecino_id=$1, herramienta_id=$2, fecha_prestamo=$3, fecha_devolucion=$4, observaciones=$5
       WHERE id=$6 RETURNING *`,
      [vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al actualizar préstamo', error);
    res.status(500).json({ error: 'Error al actualizar préstamo' });
  }
};

// ✅ Marcar préstamo como devuelto
const devolver = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `UPDATE prestamos 
       SET fecha_devolucion = CURRENT_DATE 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al devolver préstamo', error);
    res.status(500).json({ error: 'Error al devolver préstamo' });
  }
};

// ✅ Eliminar préstamo
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM prestamos WHERE id = $1', [id]);
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
  create,     // 👈 ya ajustado para frontend camelCase
  update,
  devolver,
  remove
};
