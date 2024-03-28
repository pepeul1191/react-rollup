import Sequelize from 'sequelize';
import db from '../../config/database.js';
import Member from './member.js';

const User = db.define('users', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
  user: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  password: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

User.belongsTo(Member, { foreignKey: 'member_id' });

export default User;
