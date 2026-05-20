const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 750,
        title:"",
        resizable: false,
        frame:false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

  

    mainWindow.loadFile('renderer/pages/index.html');

    
}

//handle button actions
ipcMain.on("minimize-window", () => {
    mainWindow.minimize();
});

ipcMain.on("close-window", () => {
    mainWindow.close();
});

app.whenReady().then(() => {
   Menu.setApplicationMenu(null)
    createWindow();
});
