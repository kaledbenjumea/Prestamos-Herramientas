// Importamos los hooks y librerías necesarias
import { useState, useEffect } from "react"; // useState para manejar estados, useEffect para ejecutar código al montar el componente
import axios from "axios"; // Librería para hacer peticiones HTTP al backend

// Definimos el componente PrestamoForm
// Recibe una prop "onCreated" que se ejecuta después de crear un préstamo (ej. refrescar la lista)
export default function PrestamoForm({ onCreated }) {
  // Estado para guardar la lista de herramientas disponibles
  const [herramientas, setHerramientas] = useState([]);
  // Estado para guardar la lista de vecinos registrados
  const [vecinos, setVecinos] = useState([]);
  // Estado del formulario: guarda los valores seleccionados y escritos por el usuario
  const [form, setForm] = useState({
    herramienta_id: "",
    vecino_id: "",
    observaciones: "",
  });

  // useEffect se ejecuta automáticamente cuando el componente se monta
  // Aquí hacemos las peticiones al backend para cargar herramientas y vecinos
  useEffect(() => {
    // Petición GET para obtener herramientas
    axios
      .get(`${import.meta.env.VITE_API_URL}/herramientas`)
      .then(res => 
        // Filtramos solo las herramientas disponibles
        setHerramientas(res.data.filter(h => h.disponible))
      )
      .catch(() => alert("Error cargando herramientas"));

    // Petición GET para obtener vecinos
    axios
      .get(`${import.meta.env.VITE_API_URL}/vecinos`)
      .then(res => setVecinos(res.data))
      .catch(() => alert("Error cargando vecinos"));
  }, []); // El arreglo vacío [] asegura que se ejecute solo una vez al montar el componente

  // Función que se ejecuta cada vez que el usuario cambia un campo del formulario
  const handleChange = e => {
    const { name, value } = e.target;
    // Actualizamos el estado del formulario dinámicamente
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async e => {
    e.preventDefault(); // Evita que la página se recargue
    // Enviamos los datos del formulario al backend
    await axios.post(`${import.meta.env.VITE_API_URL}/prestamos`, form);
    // Ejecutamos la función onCreated (ej. refrescar lista de préstamos)
    onCreated();
    // Limpiamos los campos del formulario
    setForm({ herramienta_id: "", vecino_id: "", observaciones: "" });
  };

  // Renderizamos el formulario
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Select para elegir la herramienta */}
      <select
        name="herramienta_id"
        value={form.herramienta_id}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Seleccione herramienta</option>
        {/* Recorremos la lista de herramientas y mostramos cada una como opción */}
        {herramientas.map(h => (
          <option key={h.id} value={h.id}>
            {h.nombre} ({h.tipo})
          </option>
        ))}
      </select>

      {/* Select para elegir el vecino */}
      <select
        name="vecino_id"
        value={form.vecino_id}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Seleccione vecino</option>
        {/* Recorremos la lista de vecinos y mostramos cada uno como opción */}
        {vecinos.map(v => (
          <option key={v.id} value={v.id}>
            {v.nombre_completo}
          </option>
        ))}
      </select>

      {/* Campo de texto para observaciones */}
      <input
        name="observaciones"
        value={form.observaciones}
        onChange={handleChange}
        placeholder="Observaciones"
        className="border rounded px-3 py-2 w-full"
      />

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Crear préstamo
      </button>
    </form>
  );
}
