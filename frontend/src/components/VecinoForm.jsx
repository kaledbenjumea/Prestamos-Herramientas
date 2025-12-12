// Importamos los hooks y librerías necesarias
import { useState } from "react"; // useState para manejar estados internos del componente
import axios from "axios";        // Librería para hacer peticiones HTTP al backend
import Mensaje_Alerta from "./Mensaje_Alerta"; // Componente para mostrar mensajes de éxito o error

// Definimos el componente VecinoForm
export default function VecinoForm() {
  // Estado inicial del formulario: cada campo empieza vacío
  const [form, setForm] = useState({
    nombre_completo: "",
    documento: "",
    telefono: "",
    email: "",
  });

  // Estado para manejar mensajes de alerta (éxito o error)
  const [message, setMessage] = useState({ type: "", text: "" });

  // Función que se ejecuta cada vez que el usuario escribe en un input
  const handleChange = e => {
    const { name, value } = e.target;
    // Actualizamos el estado del formulario dinámicamente usando el atributo "name" del input
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async e => {
    e.preventDefault(); // Evita que la página se recargue
    try {
      // Enviamos los datos del formulario al backend con axios
      await axios.post(`${import.meta.env.VITE_API_URL}/vecinos`, form);

      // Si la petición fue exitosa, mostramos mensaje de éxito
      setMessage({ type: "success", text: "Vecino registrado correctamente ✅" });

      // Limpiamos los campos del formulario
      setForm({ nombre_completo: "", documento: "", telefono: "", email: "" });
    } catch (error) {
      // Si ocurre un error, mostramos mensaje de error
      setMessage({ type: "error", text: "Error al registrar vecino ❌" });
      console.error(error);
    }
  };

  // Renderizamos el formulario
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Componente que muestra mensajes de éxito o error */}
      <Mensaje_Alerta type={message.type} text={message.text} />

      {/* Campo para el nombre completo del vecino */}
      <input
        name="nombre_completo"
        value={form.nombre_completo}
        onChange={handleChange}
        placeholder="Nombre completo"
        required
        className="border rounded px-3 py-2 w-full"
      />

      {/* Campo para el documento del vecino */}
      <input
        name="documento"
        value={form.documento}
        onChange={handleChange}
        placeholder="Documento"
        required
        className="border rounded px-3 py-2 w-full"
      />

      {/* Campo para el teléfono del vecino */}
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="border rounded px-3 py-2 w-full"
      />

      {/* Campo para el email del vecino */}
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border rounded px-3 py-2 w-full"
      />

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Registrar vecino
      </button>
    </form>
  );
}
