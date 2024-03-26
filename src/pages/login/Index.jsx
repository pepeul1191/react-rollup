import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import LogoSVG  from './../../assets/svg/bBOV3E01.svg';
import { validate } from '../../services/UserService';

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const messageParam = queryParams.get('message');
  // attributes
  const userInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const messages = {
    'user-password': 'Error: Usuario y/o contraseña no coinciden',
    'error': 'Error: Ocurrió un error no esperado',
    null: '', 
  };
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(messages[messageParam]);
  const [messageClass, setMessageClass] = useState('');
  const [disabled, setDisabled] = useState(false);

  // operations

  const validateForm = () => {
    var valid = false;
    if (user != '' && password != ''){
      valid = true;
    }
    return valid;
  }; 

  const submit = (event) => {
    event.preventDefault();
    if(validateForm()){
      setDisabled(true);
      validate(user, password)
        .then(data => {
          // Manejar la respuesta exitosa aquí
          console.log(data);
          var continueToApp = false;
          var timeout = 4500;
          if (data.status == 'error-404' || data.status == 'error-500') {
            setMessageClass('text-danger');
            setMessage(data.message);
          }else{
            continueToApp = true;
            timeout = 1500;
            setMessageClass('text-success');  
            setMessage('Inicio de sesión exitoso');
          }
          if(!continueToApp){
            userInputRef.current.focus();
            userInputRef.current.select();
            setDisabled(false);
          }
          setTimeout(() => {
            setMessage('');
            if(continueToApp){
              window.location.href = '/';
            }
          }, timeout);
        })
        .catch(error => {
          // Manejar errores aquí
          console.log(error)
          console.error("Error:", error);
        });
      }else{
        if (user == ''){
          userInputRef.current.focus();
        }else{
          passwordInputRef.current.focus();
        }
        setMessage('Debe de llenar el formulario');
        setMessageClass('text-danger');
        setTimeout(() => {
          setMessage('');
          setMessageClass('');
        }, 6000);
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
              ref={userInputRef} 
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordInputRef} 
            />
          </Form.Group>
          <Form.Label className={messageClass + ' mt-2 text-center'}>{message}</Form.Label>
          <Button variant="primary" type="submit" className="w-100" disabled={disabled}>
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