import Sequelize from 'sequelize';
import db from '../../config/database.js';

const BodyPart = db.define('body_parts', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
  name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

export default BodyPart;
