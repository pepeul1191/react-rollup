import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta'; 

export const create = (payload) => {
  try {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Error al crear el token JWT:', error);
    return null;
  }
};

export const get = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error('Error al verificar el token JWT:', error);
    return null;
  }
};
