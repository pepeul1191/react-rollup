import express from 'express';
import BodyPart  from '../models/body_part.js';
import sequelize from '../../config/database.js';

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

router.post('/save', async (req, res) => {
  let transaction;
  try {
    const { created, edited, deleted, extraData } = req.body;
    let response = {
      success: false,
      message: '',
      data: ''
    };
    let createdIds = [];
    // CRUD
    transaction = await sequelize.transaction();
    for (const element of created) {
      const user = await BodyPart.create({ 
        name: element.name
      }, { transaction });
      createdIds.push({tempId: element.id, newId: user.id});
    }
    for (const element of edited) {
      await BodyPart.update(
        { name: element.name },
        {
          where: {
            id: element.id
          },
          transaction
        }
      );
    }
    for (const element of deleted) {
      await BodyPart.destroy(
        {
          where: {
            id: element.id
          },
          transaction
        }
      );
    }
    await transaction.commit();
    // response
    let status = 200;
    response = {
      success: true,
      message: 'Se ha registrado los cambios en las partes del cuerpo.',
      data: createdIds
    };
    res.status(status).send(JSON.stringify(response));
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error al gestionar las partes del cuerpo:', error);
    response = {
      success: false,
      message: 'Error en crear el usuario del miembro',
      data: error
    };
    res.status(status).send(JSON.stringify(response));
  }
});

export default router;
