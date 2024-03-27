import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import LogoSVG from './../../assets/svg/bBOV3E01.svg';
import { validate } from '../../services/UserService';

class Index extends Component {
  constructor(props) {
    console.log('constructor')
    super(props);
    this.state = {
      user: '',
      password: '',
      message: '',
      messageClass: '',
      disabled: false
    };
    this.userInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  componentDidMount() {
    console.log('componentWillMount')
    const token = localStorage.getItem('jwtToken');
    if (token != null) {
      //window.location.href = '/';
    }
  }

  validateForm() {
    const { user, password } = this.state;
    return user !== '' && password !== '';
  }

  submit = (event) => {
    event.preventDefault();
    const { user, password } = this.state;
    const { history } = this.props;
    if (this.validateForm()) {
      this.setState({ disabled: true });
      validate(user, password)
        .then(data => {
          let continueToApp = false;
          let timeout = 4500;
          if (data.status === 'error-404' || data.status === 'error-500') {
            this.setState({
              messageClass: 'text-danger',
              message: data.message,
              disabled: false
            });
          } else {
            continueToApp = true;
            timeout = 1500;
            this.setState({
              messageClass: 'text-success',
              message: 'Inicio de sesión exitoso'
            });
          }
          if (!continueToApp) {
            this.userInputRef.current.focus();
            this.userInputRef.current.select();
          }
          setTimeout(() => {
            this.setState({ message: '' });
            localStorage.setItem('jwtToken', data.message);
            if (continueToApp) {
              history.push('/');
            }
          }, timeout);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      if (this.state.user === '') {
        this.userInputRef.current.focus();
      } else {
        this.passwordInputRef.current.focus();
      }
      this.setState({ message: 'Debe de llenar el formulario', messageClass: 'text-danger' });
      setTimeout(() => {
        this.setState({ message: '', messageClass: '' });
      }, 6000);
    }
  };

  render() {
    console.log('render')
    const { message, messageClass, disabled, user, password } = this.state;
    return (
      <>
        <div className="form-container">
          <div className="logo-container">
            <LogoSVG className="logo custom-color" />
          </div>
          <Form onSubmit={this.submit} style={{ width: '300px' }} className="row" >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={user}
                onChange={(e) => this.setState({ user: e.target.value })}
                ref={this.userInputRef}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                ref={this.passwordInputRef}
              />
            </Form.Group>
            <Form.Label className={`${messageClass} mt-2 text-center`}>{message}</Form.Label>
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

export default Index;
