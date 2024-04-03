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
    };
    this.emailInputRef = React.createRef();
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
    const {message, messageClass, disabled, isValidJWT} = this.state;
    if (isValidJWT) {
      window.location.href = '/';
      return null;
    }
    return (
      <>
        <h2>Crear Cuenta???</h2>
        <p>Esta es la página de información sobre nosotros.</p>
      </>
    );
  }
}

export default SignIn;
