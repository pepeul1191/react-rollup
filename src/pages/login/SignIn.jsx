import React, { useState, Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoSVG  from './../../assets/svg/bBOV3E01.svg';
import { sendEmail, loginCheck } from '../../services/UserService';

class SignIn extends Component {
  constructor(props) {
    console.log('constructor')
    super(props);
    this.state = {
      message: '',
      messageClass: '',
      disabled: false,
      isValidJWT: false,
      user: '',
      password: '',
      passwordRepeted: '',
      dni: '',
      code: '',
      isValidEmail: true,
      isValidDNI: true,
      isValidCode: true,
      codeMessege: '',
      isValidUser: true,
      isValidPassword1: true,
      isValidPassword2: true,
      errors: {
        dni: '',
        code: '',
        user: '',
        password1: '',
        password2: '',
      },
    };
    this.emailInputRef = React.createRef();
    this.userInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.passwordInputRepeteadRef = React.createRef();
    this.dniInputRef = React.createRef();
    this.codeInputRef = React.createRef();
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token != null) {
      loginCheck()
        .then(data => {
          if (data.success == true){
            // token time expired, continue to login
            this.setState({
              isValidJWT: true,
            });
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });      
    }
  }

  validateForm() {
    this.setState({
      isValidDNI: !this.state.isValidDNI,
    });
    return false;
  }

  handleChange = (stateElement, value) => {
    this.setState({ [stateElement]: value }, () => {
      this.validateField(stateElement, value);
    });
  }

  validateField(field, value){
    let state = { ...this.state };
    switch (field) {
      case 'dni':
        if (value == '') {
          state.isValidDNI = false;
          state.errors.dni = 'No puede estar vacío';
        }else if ((/^\d{8}$/).test(value) == false) {
          state.isValidDNI = false;
          state.errors.dni = 'Formato no válido';
        }else{
          state.isValidDNI = true;
          state.errors.dni = '';
        }
        break;
      case 'code':
        if (value == '') {
          state.isValidCode = false;
          state.errors.code = 'No puede estar vacío';
        }else if (isNaN(value) != false) {
          state.isValidCode = false;
          state.errors.code = 'No puede usar letras, sólo números';
        }else if (value.includes(' ')) {
          state.isValidCode = false;
          state.errors.code = 'No puede espaciar el código';
        }else if(value.toString().length != 8){
          state.isValidCode = false;
          state.errors.code = 'Tiene que ser un número de 8 caracteres';
        }else{
          state.isValidCode = true;
          state.errors.code = '';
        }
        break;
      case 'email':
        errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Ingrese un correo electrónico válido';
        break;
      default:
        break;
    }
    this.setState(state);
  }

  submit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      
    }
  };

  render() {
    const {message, messageClass, disabled, isValidJWT, code, dni, user, password, passwordRepeted, isValidEmail, isValidDNI, isValidCode, isValidUser, isValidPassword1, isValidPassword2, errors} = this.state;
    if (isValidJWT) {
      window.location.href = '/';
      return null;
    }
    return (
      <>
        <div className="form-container">
          <div className="logo-container">
            <LogoSVG className="logo custom-color" />
          </div>
          <Form onSubmit={this.submit} style={{ width: '300px' }} className="row" >
            <Col>
              <Row className="mt-2" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <Col>
                  <div className="left-aligned-content" style={{ marginRight: '5px' }}>
                    <Form.Group controlId="formDNI">
                      <Form.Label>DNI</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su DNI"
                        value={dni}
                        onChange={(e) => this.handleChange('dni', e.target.value)}
                        ref={this.userInputRef}
                        className={!isValidDNI ? 'is-invalid' : ''}
                      />
                      {!isValidDNI ? <Form.Text className="text-danger">{errors.dni}</Form.Text> : ''}
                    </Form.Group>
                  </div>
                </Col>
                <Col>
                  <div className="left-aligned-content" style={{ marginLeft: '5px' }}>
                    <Form.Group controlId="formCode">
                      <Form.Label>Código</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su código"
                        value={code}
                        onChange={(e) => this.handleChange('code', e.target.value)}
                        ref={this.userInputRef} 
                        className={!isValidCode ? 'is-invalid': ''}
                      />
                    </Form.Group>
                    {!isValidCode ? <Form.Text className="text-danger">{errors.code}</Form.Text> : ''}
                  </div>
                </Col>
              </Row>
              <Form.Group controlId="formUser" className="mt-1">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={this.user}
                  onChange={(e) => this.setState({ user: e.target.value })}
                  ref={this.userInputRef}
                />
              </Form.Group>
              <Form.Group controlId="formPassword1" className="mt-1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={this.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  ref={this.passwordInputRef}
                />
              </Form.Group>
              <Form.Group controlId="formPassword2" className="mt-1">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repita su contraseña"
                  value={this.passwordRepeted}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  ref={this.passwordInputRepeteadRef}
                />
              </Form.Group>
              <Form.Label className={`${messageClass} mt-2 text-center`}>{message}</Form.Label>
              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={disabled}>
                Crear Usuario
              </Button>
            </Col>
          </Form>
          <Row className="mt-2">
            <Col>
              <div className="left-aligned-content">
                <Link to="/login" style={{ textAlign: 'left' }} className="link">Ingresar</Link>
              </div>
            </Col>
            <Col>
              <div className="right-aligned-content" style={{ textAlign: 'right' }}>
                <Link to="/reset-password" style={{ textAlign: 'right' }} className="link">Cambiar contaseña</Link>
              </div>
            </Col>
          </Row>
        </div>
        <Row className="mt-2">
          <footer className="mt-3" style={{ textAlign: 'left', paddingLeft: '14px' }}>
            Powered by Software Web Perú 2023. <a style={{ fontWeight: 400 }} className="link" target="_blank" href="https://softweb.pe">Ir</a>.
          </footer>
        </Row>
      </>
    );
  }
}

export default SignIn;
