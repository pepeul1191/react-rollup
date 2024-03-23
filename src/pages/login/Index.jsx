import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoSVG  from './../../assets/svg/bBOV3E01.svg';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  return (
    <>
      <div className="form-container">
        <div className="logo-container">
          <LogoSVG className="logo custom-color" />
        </div>
        <Form onSubmit={handleSubmit} style={{width: '300px'}} className="row" >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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