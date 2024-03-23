import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoSVG  from './../../assets/svg/bBOV3E01.svg';

const ResetPassword = () => {
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
        <Form onSubmit={handleSubmit} style={{width: '300px'}} className="row mt-2" >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-2">
            Enviar Solicitud
          </Button>
        </Form>
        <Row className="mt-2">
          <Col>
            <div className="left-aligned-content">
              <Link to="/login" className="link" style={{ textAlign: 'left' }}>Ingresar</Link>
            </div>
          </Col>
          <Col>
            <div className="right-aligned-content" style={{'textAlign': 'right'}}>
              <Link to="/sign-in" className="link" style={{ textAlign: 'right' }}>Crear cuenta</Link>
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

export default ResetPassword;