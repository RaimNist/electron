const { Menu } = require('electron');
Menu.setApplicationMenu(null);
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Employee, Role, Category, MenuItem, Order, OrderItem } = require('./database/models');

let mainWindow;

// 📌 Создаём главное окно
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Подключаем preload
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html'); // Загружаем главную страницу
}

// 📌 Запускаем окно, когда Electron готов
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 📌 Закрываем приложение, если все окна закрыты (не касается macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 📌 Получение списка сотрудников
ipcMain.handle('get-employees', async () => {
    return await Employee.findAll();
});

// 📌 Получение меню (блюд)
ipcMain.handle('get-menu', async () => {
    const menu = await MenuItem.findAll();
    console.log('📌 Данные из БД (main.js):', menu);
    return menu;
});

// 📌 Получение заказов
ipcMain.handle('get-orders', async () => {
    return await Order.findAll({ include: [{ model: Employee }] });
});

// 📌 Создание нового заказа
ipcMain.handle('create-order', async (event, employeeId, items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ employee_id: employeeId, total_price: totalPrice });

    for (const item of items) {
        await OrderItem.create({ order_id: order.id, menu_item_id: item.id, quantity: item.quantity, price: item.price });
    }

    return order;
});

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })