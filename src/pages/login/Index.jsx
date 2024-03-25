import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import LogoSVG  from './../../assets/svg/bBOV3E01.svg';
import { validate } from '../../services/UserService';

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const messageParam = queryParams.get('message');
  // attributes
  const messages = {
    'user-password': 'Error: Usuario y/o contraseña no coinciden',
    'error': 'Error: Ocurrió un error no esperado',
    null: '', 
  };
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(messages[messageParam]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = await validate(user, password);
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
      <div className="form-container">
        <div className="logo-container">
          <LogoSVG className="logo custom-color" />
        </div>
        <Form onSubmit={submit} style={{width: '300px'}} className="row" >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Label>{message}</Form.Label>
          <Button variant="primary" type="submit" className="w-100 mt-2">
            Ingresar
          </Button>
        </Form>
        <Row className="mt-2">
          <Col>
            <div className="left-aligned-content">
              <Link to="/sign-in" style={{ textAlign: 'left' }} className="link">Crear Cuenta</Link>
            </div>
          </Col>
          <Col>
            <div className="right-aligned-content" style={{'textAlign': 'right'}}>
              <Link to="/reset-password" style={{ textAlign: 'right' }} className="link">Cambiar contaseña</Link>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="mt-2">
        <footer className="mt-3" style={{textAlign: 'left', paddingLeft: '14px'}}>
          Powered by Software Web Perú 2023. <a style={{fontWeight: 400}} className="link" target="_blank" href="https://softweb.pe">Ir</a>.
        </footer>
      </Row>
    </>
  );
};

export default Index;