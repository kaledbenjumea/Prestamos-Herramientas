// Definimos el componente Mensaje_Alerta
// Recibe dos props: 
// - type: el tipo de mensaje ("success" o "error")
// - text: el texto que se mostrará en pantalla
export default function Mensaje_Alerta({ type, text }) {
  // Si no hay texto, no mostramos nada (retorna null)
  if (!text) return null;

  // Clases base que siempre se aplican al mensaje (padding, borde redondeado, margen inferior)
  const baseClasses = "p-2 rounded mb-4";

  // Según el tipo de mensaje, aplicamos estilos diferentes:
  // - success → fondo verde claro y texto verde
  // - error → fondo rojo claro y texto rojo
  const styles =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  // Renderizamos un <div> con las clases combinadas y el texto del mensaje
  return <div className={`${baseClasses} ${styles}`}>{text}</div>;
}
