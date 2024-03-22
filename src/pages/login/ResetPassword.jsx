import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Form onSubmit={handleSubmit} style={{width: '300px'}} className="row" >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-2">
          Submit
        </Button>
      </Form>
      <Row className="mt-2">
        <Col>
          <div className="left-aligned-content">
            <Link to="/login" style={{ textAlign: 'left' }}>Ingresar</Link>
          </div>
        </Col>
        <Col>
          <div className="right-aligned-content" style={{'textAlign': 'right'}}>
            <Link to="/sign-in" style={{ textAlign: 'right' }}>Crear cuenta</Link>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <footer className="mt-3" style={{textAlign: 'left'}}>
          Footer asasdf
        </footer>
      </Row>
    </>
  );
};

export default ResetPassword;