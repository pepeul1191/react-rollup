import express from 'express';
import { getContent, getTitle } from '../../config/contents.js';
import { accessCss, accessJs } from '../helpers/error_helper.js';
import constants from '../../config/constants.js';
import helpers from '../../config/helpers.js';

const router = express.Router();

router.get('/access/:num', (req, res, next) => {
  const status = 404;
  let errorNumber = req.params.num;
  const registeredErrors = ['404', '5051', '8080'];
  const lang = 'sp';
  // Comprobar si el número de error no está registrado; en ese caso, usar error 404 por defecto
  if (!registeredErrors.includes(errorNumber)) {
    errorNumber = '404';
  }
  // Respuesta
  const locals = {
    constants: constants,
    title: getTitle()[lang]['error'],
    helpers: helpers,
    contents: getContent('error')[lang][errorNumber],
    lang: lang,
  };
  res.render('error/access', locals);
});

export default router;
