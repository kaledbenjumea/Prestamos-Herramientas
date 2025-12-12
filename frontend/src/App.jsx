// Importamos React y los hooks necesarios
import { useState } from 'react';

// Importamos los componentes que construimos para cada sección
import HerramientasList from './components/HerramientasList';
import HerramientaForm from './components/HerramientaForm';
import PrestamosList from './components/PrestamosList';
import VecinoForm from './components/VecinoForm';
import PrestamoForm from './components/PrestamoForm';
import VecinosList from './components/VecinosList';

// Importamos íconos de Heroicons para la navegación
import {
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

// Definimos el componente principal de la aplicación
function App() {
  // Estado para controlar qué pestaña está activa (herramientas, vecinos o préstamos)
  const [tab, setTab] = useState('herramientas');

  // 👇 Verificamos que la variable de entorno se está leyendo correctamente
  console.log('API URL desde .env:', import.meta.env.VITE_API_URL);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header con navegación responsive */}
      <header className="bg-blue-700 text-white flex flex-col md:flex-row items-center">
        {/* Título principal */}
        <h1 className="text-2xl font-bold p-4 md:w-64 text-center md:text-left">
          Banco de Herramientas
        </h1>

        {/* Navegación con botones e íconos */}
        <nav className="grid grid-cols-1 md:grid-cols-3 w-full">
          {/* Botón Herramientas */}
          <button
            onClick={() => setTab('herramientas')} // Cambia la pestaña activa
            className={`flex flex-col items-center justify-center gap-1 px-4 py-4 ${
              tab === 'herramientas'
                ? 'bg-blue-900 text-white' // Estilo activo
                : 'bg-blue-700 text-white hover:bg-blue-600' // Estilo inactivo con hover
            }`}
          >
            <WrenchScrewdriverIcon className="h-6 w-6" />
            <span className="text-sm font-medium">Herramientas</span>
          </button>

          {/* Botón Vecinos */}
          <button
            onClick={() => setTab('vecinos')}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-4 ${
              tab === 'vecinos'
                ? 'bg-blue-900 text-white'
                : 'bg-blue-700 text-white hover:bg-blue-600'
            }`}
          >
            <UserGroupIcon className="h-6 w-6" />
            <span className="text-sm font-medium">Vecinos</span>
          </button>

          {/* Botón Préstamos */}
          <button
            onClick={() => setTab('prestamos')}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-4 ${
              tab === 'prestamos'
                ? 'bg-blue-900 text-white'
                : 'bg-blue-700 text-white hover:bg-blue-600'
            }`}
          >
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
            <span className="text-sm font-medium">Préstamos</span>
          </button>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded shadow p-6">
          {/* Sección Herramientas */}
          {tab === 'herramientas' && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Gestión de Herramientas
              </h2>
              {/* Formulario para registrar herramientas */}
              <HerramientaForm onCreated={() => window.location.reload()} />
              {/* Lista de herramientas registradas */}
              <HerramientasList />
            </>
          )}

          {/* Sección Vecinos */}
          {tab === 'vecinos' && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Registro de Vecinos
              </h2>
              {/* Formulario para registrar vecinos */}
              <VecinoForm onCreated={() => window.location.reload()} />
              {/* Lista de vecinos registrados */}
              <VecinosList />
            </>
          )}

          {/* Sección Préstamos */}
          {tab === 'prestamos' && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Gestión de Préstamos
              </h2>
              {/* Formulario para crear préstamos */}
              <PrestamoForm onCreated={() => window.location.reload()} />
              {/* Lista de préstamos registrados */}
              <PrestamosList />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// Exportamos el componente principal
export default App