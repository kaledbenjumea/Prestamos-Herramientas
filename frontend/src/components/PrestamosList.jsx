// Importamos los hooks y librerías necesarias
import { useEffect, useState } from "react"; // useState para manejar estados, useEffect para ejecutar código al montar el componente
import axios from "axios"; // Librería para hacer peticiones HTTP al backend

// Definimos el componente PrestamosList
export default function PrestamosList() {
  // Estado inicial: un arreglo vacío donde guardaremos los préstamos que vienen del backend
  const [prestamos, setPrestamos] = useState([]);

  // useEffect se ejecuta automáticamente cuando el componente se monta en pantalla
  // Aquí hacemos la petición al backend para obtener la lista de préstamos
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/prestamos`) // Petición GET al backend en la ruta /prestamos
      .then(res => setPrestamos(res.data))             // Si la petición es exitosa, guardamos los datos en el estado
      .catch(err => console.error("Error al cargar préstamos", err)); // Si falla, mostramos el error en consola
  }, []); // El arreglo vacío [] significa que este efecto se ejecuta solo una vez al montar el componente

  // Renderizamos el contenido del componente
  return (
    <div className="mt-6">
      {/* Título de la sección */}
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Préstamos registrados</h3>

      {/* Lista de préstamos */}
      <ul className="space-y-2">
        {/* Recorremos el arreglo de préstamos con map */}
        {prestamos.map(p => (
          // Cada elemento de la lista debe tener una key única (usamos el id del préstamo)
          <li key={p.id} className="border rounded p-3 bg-gray-50">
            {/* Mostramos la herramienta asociada al préstamo */}
            <strong>Herramienta:</strong> {p.herramienta}
            <br />
            {/* Mostramos el vecino que pidió la herramienta */}
            <strong>Vecino:</strong> {p.vecino}
            <br />
            {/* Mostramos fechas y observaciones */}
            <span className="text-sm text-gray-600">
              {/* Fecha de préstamo (recortamos a formato YYYY-MM-DD con slice) */}
              Prestado el {p.fecha_prestamo?.slice(0, 10)}
              {/* Si existe fecha de devolución, la mostramos */}
              {p.fecha_devolucion && ` — Devuelto el ${p.fecha_devolucion.slice(0, 10)}`}
              {/* Si existen observaciones, las mostramos */}
              {p.observaciones && ` — ${p.observaciones}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
