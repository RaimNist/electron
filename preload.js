const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getEmployees: () => ipcRenderer.invoke('get-employees'),
    getCategories: () => ipcRenderer.invoke('get-categories'),
    getMenu: async () => {
        const data = await ipcRenderer.invoke('get-menu');
        console.log('📌 Данные в preload.js:', data); // Проверяем, приходят ли данные
        return data;
    },
    getOrders: () => ipcRenderer.invoke('get-orders'),
    createOrder: (employeeId, items) => ipcRenderer.invoke('create-order', employeeId, items)
});
