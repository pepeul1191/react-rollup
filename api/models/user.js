const Sequelize = require('sequelize');
var db = require('../../config/database');
const Member = require('./member')

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

module.exports = User;