import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Inicio from './components/Inicio';
import ListaRecidentes from './components/Residentes/ListaRecidentes';
import Visitas from './components/Visitas/Visitas';
import CrearVisita from './components/Visitas/CrearVisita';
import Estadisticas from './components/Estadisticas/Estadisticas';
import RegistroResidente from './components/Residentes/RegistrarResidente';



function App() {
  // Esta función se llama cuando el usuario inicia sesión
  const handleLogin = (nombre: string, numeroIdentificacion: string) => {
    // Aquí podríamos guardar el estado de autenticación o hacer otras cosas
    console.log('Usuario logueado:', nombre, numeroIdentificacion);
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/registrar_residente" element={<RegistroResidente />} />
          <Route path="/inicio" element={<Inicio contenido={'Bienvenido pa.'} />} />
          <Route path="/lista_residentes" element={<Inicio contenido={<ListaRecidentes />} />} />
          <Route path="/lista_visitas" element={<Inicio contenido={<Visitas />} />} />
          <Route path="/agregar_visita" element={<Inicio contenido={<CrearVisita />} />} />
          <Route path="/estadisticas" element={<Inicio contenido={<Estadisticas />} />} />
        </Routes>
      </Router>
      {/* Componente para mostrar notificaciones al usuario */}
      <Toaster />
    </>
  );
}

export default App;
