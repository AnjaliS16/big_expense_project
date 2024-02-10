const Sequelize = require('sequelize');

const sequelize = new Sequelize('anjali', 'root', 'A1693@anja#', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
