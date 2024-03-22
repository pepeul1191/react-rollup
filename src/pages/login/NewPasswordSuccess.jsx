import React from 'react';
import { Link } from 'react-router-dom';

const NewPasswordSuccess = () => (
  <>
    <h2>Cambio de contraseña exitoso</h2>
    <p>Puede ir al login e ingresar al sistema.</p>
    <p><Link to="/login" style={{ textAlign: 'left' }}>Ir al Login</Link></p>
  </>
);

export default NewPasswordSuccess;