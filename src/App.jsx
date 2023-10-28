import React from 'react';
import './styles.css'; 
import MyModalComponent from './MyModalComponent'; // Asegúrate de ajustar la ruta al archivo según la ubicación real de tu componente.


function App() {
  return (
    <div>
      <h1>Mi Aplicación React!!!</h1>
      <p>Bienvenido a mi aplicación React.</p>
      <MyModalComponent /> {/* Incluye el componente de modal aquí */}
    </div>
  );
}

export default App;