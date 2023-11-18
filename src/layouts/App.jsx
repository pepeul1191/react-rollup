import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import MyModalComponent from '../components/MyModalComponent';
import '../assets/css/styles.css'; 

const App = () => (
  <Router>
    <nav>
      <ul>
        {/* Utiliza Link para crear enlaces */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Acerca de</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
    </nav>
    <hr />
    <Routes>
      {/* Rutas */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <footer>
      Footer
    </footer>
  </Router>
);

export default App;