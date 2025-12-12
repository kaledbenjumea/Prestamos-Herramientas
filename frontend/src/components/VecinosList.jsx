// Importamos los hooks y librerías necesarias
import { useEffect, useState } from "react"; // useState para manejar estados, useEffect para ejecutar código al montar el componente
import axios from "axios"; // Librería para hacer peticiones HTTP al backend

// Definimos el componente VecinosList
export default function VecinosList() {
  // Estado inicial: un arreglo vacío donde guardaremos los vecinos que vienen del backend
  const [vecinos, setVecinos] = useState([]);

  // useEffect se ejecuta automáticamente cuando el componente se monta en pantalla
  // Aquí hacemos la petición al backend para obtener la lista de vecinos
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/vecinos`) // Petición GET al backend en la ruta /vecinos
      .then(res => setVecinos(res.data))             // Si la petición es exitosa, guardamos los datos en el estado
      .catch(err => console.error("Error al cargar vecinos", err)); // Si falla, mostramos el error en consola
  }, []); // El arreglo vacío [] significa que este efecto se ejecuta solo una vez al montar el componente

  // Renderizamos el contenido del componente
  return (
    <div className="mt-6">
      {/* Título de la sección */}
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Vecinos registrados</h3>

      {/* Lista de vecinos */}
      <ul className="space-y-2">
        {/* Recorremos el arreglo de vecinos con map */}
        {vecinos.map(v => (
          // Cada elemento de la lista debe tener una key única (usamos el id del vecino)
          <li key={v.id} className="border rounded p-3 bg-gray-50">
            {/* Mostramos el nombre completo y el documento del vecino */}
            <strong>{v.nombre_completo}</strong> — {v.documento}  
            
            {/* Mostramos teléfono y email, si no existen mostramos "N/A" */}
            <div className="text-sm text-gray-600">
              Tel: {v.telefono || "N/A"} | Email: {v.email || "N/A"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
