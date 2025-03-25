const { sequelize, Employee, Category, MenuItem } = require('./models');

async function initDatabase() {
    await sequelize.sync({ force: true }); // Пересоздаст БД

    await Employee.create({ name: 'Иван', position: 'Кассир', salary: 35000 });
    await Employee.create({ name: 'Ольга', position: 'Администратор', salary: 50000 });

    const burgerCategory = await Category.create({ name: 'Бургеры' });
    const drinkCategory = await Category.create({ name: 'Напитки' });

    await MenuItem.create({ name: 'Чизбургер', category_id: burgerCategory.id, price: 150, description: 'Сочный бургер' });
    await MenuItem.create({ name: 'Кока-Кола', category_id: drinkCategory.id, price: 100, description: 'Газировка' });

    console.log('База данных заполнена!');
}

initDatabase();


