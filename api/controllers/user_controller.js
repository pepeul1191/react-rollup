import express from 'express';
import { Op } from 'sequelize';
import User from '../models/user.js';
import Member  from '../models/member.js';
import { create as createToken, get as getJWT } from '../helpers/jwt_helper.js';
import { randomStringNumber } from '../helpers/app_helper.js';

const router = express.Router();

router.post('/validate', async (req, res) => {
  try {
    const { user, password } = req.body;
    const response = {
      success: false,
      message: '',
      data: ''
    };
    let status = 200;
    const foundUser = await User.findOne({
      where: { 
        user: user,
        password: password
      }
    });
    if (foundUser) {
      response.success = true;
      response.message = 'Usuario encontrado';
      response.data = createToken({
        user_id: foundUser.id, 
        member_id: foundUser.member_id,
        created: new Date(),
        updated: null,
      });
    } else {
      response.message = 'Usuario no encontrado';
    }
    res.status(status).send(JSON.stringify(response));
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    const response = {
      success: false,
      message: 'Error en encontrar al usuario',
      data: error
    };
    res.status(501).send(JSON.stringify(response));
  }
});

router.post('/login-check', async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extraer el token JWT eliminando el prefijo 'Bearer '
    const token = authHeader.split(' ')[1];
    try {
      const tokenDecoded = getJWT(token);
      var mindiff = 0;
      if (tokenDecoded.updated != null){
        mindiff = Math.floor((new Date() - new Date(tokenDecoded.updated)) / (1000 * 60));
      }else{
        mindiff = Math.floor((new Date() - new Date(tokenDecoded.created)) / (1000 * 60));
      }
      var valid = false;
      if (mindiff <= 1){
        valid = true;
      }
      res.status(200).send(JSON.stringify({
        success: valid,
        message: valid,
        data: ''
      }));
    } catch (error) {
      res.status(501).send(JSON.stringify({
        success: false,
        message: error,
        data: ''
      }));
    }
  } else {
    res.status(501).send(JSON.stringify({
      success: false,
      message: 'Token inválido',
      data: ''
    }));
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    const response = {
      success: false,
      message: '',
      data: ''
    };
    let status = 200;
    const foundMember = await Member.findOne({
      where: { 
        email: email
      }
    });
    if (foundMember) {
      response.success = true;
      response.message = 'Correo para cambiar su contraseña enviado.';
      response.data = {};
      await User.update(
        { reset_key: randomStringNumber(20) }, // Nuevos valores que quieres establecer
        { where: { member_id: foundMember.id } } // Condiciones para encontrar el usuario por su ID
      );
    } else {
      response.message = 'Correo no encontrado';
    }
    res.status(status).send(JSON.stringify(response));
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    const response = {
      success: false,
      message: 'Error en encontrar al miembro.',
      data: error
    };
    res.status(501).send(JSON.stringify(response));
  }
});

router.post('/create', async (req, res) => {
  try {
    const { dni, email } = req.body;
    const response = {
      success: false,
      message: '',
      data: ''
    };
    let status = 404;
    const foundMember = await Member.findOne({
      where: { 
        [Op.or]: [
          { dni: dni },
          { email: email }
        ]
      }
    });
    if (foundMember) {
      response.message = 'Correo y/o DNI en uso';
    } else {
      response.success = true;
      response.message = 'Se ha enviando un correo para activar su cuenta';
      response.data = 'Usuario creado';
      status = 200;
    }
    res.status(status).send(JSON.stringify(response));
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    const response = {
      success: false,
      message: 'Error en encontrar al miembro',
      data: error
    };
    res.status(501).send(JSON.stringify(response));
  }
});

router.post('/login-create', async (req, res) => {
  try {
    const { dni, code, user, password } = req.body;
    const response = {
      success: false,
      message: '',
      data: ''
    };
    let status = 200;
    const foundMember = await Member.findOne({
      where: { 
        [Op.and]: [
          { dni: dni },
          { code: code }
        ]
      }
    });
    if (foundMember) {
      // check if user already exist, if exist, error. if not, create one if not
      const foundUser = await User.findOne({
        where: { 
          member_id: foundMember.id 
        }
      });
      if(foundUser){
        response.success = false;
        response.message = 'Miembro ya tiene un usuario asignado.';
        response.data = {};
      }else{
        await User.create({
          user: user,
          password: password,
          activation_key: randomStringNumber(20),
          reset_key: randomStringNumber(20),
          member_id: foundMember.id
        });
        response.success = true;
        response.message = 'Usuario del miembro creado.';
        response.data = {};
      }
    } else {
      response.success = false;
      response.message = 'Miembro no registrado.';
      response.data = '';
      status = 200;
    }
    res.status(status).send(JSON.stringify(response));
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    const response = {
      success: false,
      message: 'Error en crear el usuario del miembro',
      data: error
    };
    res.status(status).send(JSON.stringify(response));
  }
});

export default router;
