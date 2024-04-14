import express from 'express';
import BodyPart  from '../models/body_part.js';

var router = express.Router();

router.get('/list', (req, res, next) => {
  BodyPart.findAll()
    .then(list => {
      if (list) {
        res.send(JSON.stringify(list)).status(200);
      } else {
        res.send('Lista no encontrada').status(404);
      }
    })
    .catch(err => {
      console.error('Error al seleccionar los registros:', err);
    });
});

export default router;
