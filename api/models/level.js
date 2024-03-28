import Sequelize from 'sequelize';
import db from '../../config/database.js';

const Level = db.define('levels', {
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

export default Level;
