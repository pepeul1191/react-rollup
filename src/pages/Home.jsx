import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../configs/constants';

const Home = () => {
  useEffect(() => {
    
  });

  return (<div>
    <h2>Home</h2>
    <h4>BASE_URL = {BASE_URL}</h4>
    <p>Bienvenido a la página de inicio.</p>
  </div>);
};

export default Home;