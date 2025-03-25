const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Файл БД в корне проекта
    logging: false, // Отключаем логи в консоли
});

module.exports = sequelize;
