import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Index from '../pages/login/Index';
import ResetPassword from '../pages/login/ResetPassword';
import NewPasswordSuccess from '../pages/login/NewPasswordSuccess';
import SignIn from '../pages/login/SignIn';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/css/styles.css'; 
import '../assets/css/login.css'; 

const Login = () => (
  <Router>
    <Container className="d-flex justify-content-center align-items-center w-100" style={{ height: '100vh'}}>
      <div className="">
        <Routes>
          <Route path="/login" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password/success" element={<NewPasswordSuccess />} />
        </Routes>
      </div>
    </Container>
  </Router>
);

export default Login;