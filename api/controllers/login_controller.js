import express from 'express';
import { getContent, getTitle } from '../../config/contents.js';
import { accessCss, accessJs } from '../helpers/error_helper.js';
import constants from '../../config/constants.js';
import helpers from '../../config/helpers.js';

const router = express.Router();

router.get([
  '/login',
  '/sign-in',
  '/reset-password',
  '/new-password/success'
], (req, res, next) => {
  // Respuesta
  const locals = {
    constants: constants,
    title: 'Ingresar al Sistema',
    helpers: helpers,
    contents: '',
  };
  res.render('login/index', locals);
});

export default router;
