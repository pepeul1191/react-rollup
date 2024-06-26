import express from 'express';
import constants from '../../config/constants.js';
import helpers from '../../config/helpers.js';
import { indexCss, indexJs } from '../helpers/home_helper.js';

const router = express.Router();

router.get('', (req, res, next) => {
  // response
  const locals = {
    constants,
    title: 'Bienvenido',
    helpers: helpers,
    csss: indexCss(),
    session: req.session,
    jss: indexJs(),
    contents: {},
  };
  res.status(200).render('home/index', locals);
});

router.get('/profile', (req, res, next) => {
  const body = `Usuario: ${req.session.user}<br>
    Estado: ${req.session.state}<br>
    Momento: ${req.session.time}`;
  res.status(200).send(body);
});

router.get('/sign-out', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.get('/about', (req, res, next) => {
  const group = [
    { codigo: 20051191, nombre: 'Pepe Valdivia' },
    { codigo: 20071191, nombre: 'Yacky Ramirez' },
    { codigo: 20161191, nombre: 'Sila Esculapia' },
    { codigo: 20231191, nombre: 'Chicle Pinkerton' },
  ];
  res.status(200).send(JSON.stringify(group));
});

router.get('/demo/', (req, res, next) => {
  console.log('XD');
  req.session = null;
  res.redirect('/');
});

export default router;
