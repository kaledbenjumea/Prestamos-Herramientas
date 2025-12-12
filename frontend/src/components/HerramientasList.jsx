// Importamos los hooks y librerías necesarias
import { useEffect, useState } from "react"; // useState para manejar estado, useEffect para ejecutar código al montar el componente
import axios from "axios"; // Librería para hacer peticiones HTTP al backend

// Definimos el componente HerramientasList
export default function HerramientasList() {
  // Estado inicial: un arreglo vacío donde guardaremos las herramientas que vienen del backend
  const [herramientas, setHerramientas] = useState([]);

  // useEffect se ejecuta automáticamente cuando el componente se monta en pantalla
  // Aquí hacemos la petición al backend para obtener la lista de herramientas
  useEffect(() => {
    axios
      .get("http://localhost:4000/herramientas") // Petición GET al backend en la ruta /herramientas
      .then(res => setHerramientas(res.data))   // Si la petición es exitosa, guardamos los datos en el estado
      .catch(() => alert("Error cargando herramientas")); // Si falla, mostramos un mensaje de error
  }, []); // El arreglo vacío [] significa que este efecto se ejecuta solo una vez al montar el componente

  // Renderizamos el contenido del componente
  return (
    <div>
      {/* Título de la sección */}
      <h3 className="text-lg font-semibold mb-4">Herramientas</h3>

      {/* Lista de herramientas */}
      <ul>
        {/* Recorremos el arreglo de herramientas con map */}
        {herramientas.map(h => (
          // Cada elemento de la lista debe tener una key única (usamos el id de la herramienta)
          <li key={h.id}>
            {/* Mostramos el nombre y el tipo de cada herramienta */}
            {h.nombre} ({h.tipo})
          </li>
        ))}
      </ul>
    </div>
  );

  // Este console.log imprime en la consola el valor de la variable de entorno VITE_API_URL
  // Sirve para verificar que la URL de la API está configurada correctamente en tu archivo .env
  console.log(import.meta.env.VITE_API_URL);
}
