import { useState, useEffect } from 'react';
import axios from 'axios';

function PrestamoForm({ onCreated }) {
  // Estados para guardar las opciones y los valores seleccionados
  const [herramientas, setHerramientas] = useState([]);
  const [vecinos, setVecinos] = useState([]);
  const [herramientaId, setHerramientaId] = useState('');
  const [vecinoId, setVecinoId] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Cargar herramientas y vecinos al montar el componente
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/herramientas`)
      .then(res => setHerramientas(res.data))
      .catch(err => console.error('Error cargando herramientas', err));

    axios.get(`${import.meta.env.VITE_API_URL}/vecinos`)
      .then(res => setVecinos(res.data))
      .catch(err => console.error('Error cargando vecinos', err));
  }, []);

  // Función para crear préstamo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👇 Aquí mandamos los campos con camelCase como espera el backend ajustado
      const payload = {
        vecinoId,
        herramientaId,
        observaciones
      };

      console.log('Payload enviado:', payload);

      await axios.post(`${import.meta.env.VITE_API_URL}/prestamos`, payload);

      // Si todo sale bien, limpiamos el formulario
      setHerramientaId('');
      setVecinoId('');
      setObservaciones('');

      // Llamamos la función para refrescar la lista
      if (onCreated) onCreated();
    } catch (error) {
      console.error('Error al crear préstamo:', error);
      alert('No se pudo crear el préstamo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Gestión de Préstamos</h3>

      {/* Selector de herramienta */}
      <select value={herramientaId} onChange={(e) => setHerramientaId(e.target.value)} required>
        <option value="">Seleccione herramienta</option>
        {herramientas.map(h => (
          <option key={h.id} value={h.id}>
            {h.nombre} ({h.tipo})
          </option>
        ))}
      </select>

      {/* Selector de vecino */}
      <select value={vecinoId} onChange={(e) => setVecinoId(e.target.value)} required>
        <option value="">Seleccione vecino</option>
        {vecinos.map(v => (
          <option key={v.id} value={v.id}>
            {v.nombre_completo}
          </option>
        ))}
      </select>

      {/* Campo de observaciones */}
      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />

      {/* Botón para crear préstamo */}
      <button type="submit">Crear préstamo</button>
    </form>
  );
}

export default PrestamoForm;
