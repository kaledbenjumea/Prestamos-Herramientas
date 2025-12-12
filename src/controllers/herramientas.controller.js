// Importamos la conexión a la base de datos desde el archivo db.js
const pool = require('../db');

// 📌 Controlador para listar todas las herramientas
exports.getAll = async (req, res) => {
  try {
    // Ejecutamos consulta SQL para traer todas las herramientas ordenadas por id
    const { rows } = await pool.query('SELECT * FROM herramientas ORDER BY id');
    // Respondemos con el resultado en formato JSON
    res.json(rows);
  } catch (e) {
    // Si ocurre un error, devolvemos código 500 (error interno del servidor)
    res.status(500).json({ error: 'Error al listar herramientas' });
  }
};

// 📌 Controlador para obtener una herramienta por su ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params; // Capturamos el id desde la URL
    // Consulta SQL para buscar la herramienta por id
    const { rows } = await pool.query('SELECT * FROM herramientas WHERE id=$1', [id]);
    // Si no se encuentra, devolvemos error 404 (no encontrada)
    if (!rows.length) return res.status(404).json({ error: 'No encontrada' });
    // Si existe, devolvemos la herramienta encontrada
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Error al consultar herramienta' });
  }
};

// 📌 Controlador para crear una nueva herramienta
exports.create = async (req, res) => {
  try {
    // Capturamos los datos enviados en el body de la petición
    const { tipo, nombre, estado, disponible = true, notas = null } = req.body;

    // Insertamos la nueva herramienta en la base de datos
    const { rows } = await pool.query(
      `INSERT INTO herramientas (tipo, nombre, estado, disponible, notas)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [tipo, nombre, estado, disponible, notas]
    );

    // Respondemos con la herramienta creada y código 201 (creado)
    res.status(201).json(rows[0]);
  } catch (e) {
    // Si hay error en los datos, devolvemos código 400 (datos inválidos)
    res.status(400).json({ error: 'Datos inválidos o estado no permitido' });
  }
};

// 📌 Controlador para actualizar una herramienta existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // ID de la herramienta a actualizar
    const { tipo, nombre, estado, disponible, notas } = req.body;

    // Actualizamos la herramienta usando COALESCE:
    // si el valor es null o no se envía, mantiene el valor actual
    const { rows } = await pool.query(
      `UPDATE herramientas
       SET tipo = COALESCE($1, tipo),
           nombre = COALESCE($2, nombre),
           estado = COALESCE($3, estado),
           disponible = COALESCE($4, disponible),
           notas = COALESCE($5, notas)
       WHERE id=$6
       RETURNING *`,
      [tipo, nombre, estado, disponible, notas, id]
    );

    // Si no se encuentra la herramienta, devolvemos 404
    if (!rows.length) return res.status(404).json({ error: 'No encontrada' });
    // Si se actualiza correctamente, devolvemos la herramienta modificada
    res.json(rows[0]);
  } catch {
    res.status(400).json({ error: 'Error al actualizar herramienta' });
  }
};

// 📌 Controlador para eliminar una herramienta
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Antes de eliminar, verificamos si la herramienta tiene préstamos activos
    const active = await pool.query(
      'SELECT 1 FROM prestamos WHERE herramienta_id=$1 AND fecha_devolucion IS NULL LIMIT 1',
      [id]
    );

    // Si existe un préstamo activo, devolvemos error 409 (conflicto)
    if (active.rows.length) {
      return res.status(409).json({ error: 'La herramienta tiene préstamo activo' });
    }

    // Si no hay préstamos activos, eliminamos la herramienta
    const { rowCount } = await pool.query('DELETE FROM herramientas WHERE id=$1', [id]);

    // Si no se encuentra la herramienta, devolvemos 404
    if (!rowCount) return res.status(404).json({ error: 'No encontrada' });

    // Si se elimina correctamente, devolvemos 204 (sin contenido)
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Error al eliminar herramienta' });
  }
};
