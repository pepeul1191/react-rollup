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
    };
    this.emailInputRef = React.createRef();
    this.userInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.passwordInputRepeteadRef = React.createRef();
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
    
    return false;
  }

  submit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      
    }
  };

  render() {
    const {message, messageClass, disabled, isValidJWT, user, password, passwordRepeted} = this.state;
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
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>DNI</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su DNI"
                        value={this.state.user}
                        onChange={(e) => this.setState({ user: e.target.value })}
                        ref={this.userInputRef}
                      />
                    </Form.Group>
                  </div>
                </Col>
                <Col>
                  <div className="left-aligned-content" style={{ marginLeft: '5px' }}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Código</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su código"
                        value={this.state.user}
                        onChange={(e) => this.setState({ user: e.target.value })}
                        ref={this.userInputRef}
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Form.Group controlId="formBasicEmail" className="mt-1">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={this.user}
                  onChange={(e) => this.setState({ user: e.target.value })}
                  ref={this.userInputRef}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={this.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  ref={this.passwordInputRef}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-1">
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
