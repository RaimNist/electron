const { DataTypes } = require('sequelize');
const sequelize = require('./config');

// 1. Сотрудники
const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING }
});

// 2. Роли сотрудников
const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_name: { type: DataTypes.STRING, allowNull: false }
});

// 3. Категории блюд
const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

// 4. Меню (блюда)
const MenuItem = sequelize.define('MenuItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.STRING }
});

// 5. Заказы
const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// 6. Позиции в заказе
const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    menu_item_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

// 7. Рабочие смены сотрудников
const Shift = sequelize.define('Shift', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    shift_date: { type: DataTypes.DATE, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false }
});

// 8. Ингредиенты
const Ingredient = sequelize.define('Ingredient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    stock_quantity: { type: DataTypes.INTEGER, allowNull: false }
});

// 9. Связь блюд с ингредиентами
const MenuItemIngredient = sequelize.define('MenuItemIngredient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    menu_item_id: { type: DataTypes.INTEGER, allowNull: false },
    ingredient_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

// 10. Лог действий админов
const Log = sequelize.define('Log', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.TEXT, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Определяем связи
Employee.belongsTo(Role, { foreignKey: 'role_id' });
MenuItem.belongsTo(Category, { foreignKey: 'category_id' });
Order.belongsTo(Employee, { foreignKey: 'employee_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });
Shift.belongsTo(Employee, { foreignKey: 'employee_id' });
MenuItemIngredient.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });
MenuItemIngredient.belongsTo(Ingredient, { foreignKey: 'ingredient_id' });
Log.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = {
    sequelize,
    Employee,
    Role,
    Category,
    MenuItem,
    Order,
    OrderItem,
    Shift,
    Ingredient,
    MenuItemIngredient,
    Log
};
