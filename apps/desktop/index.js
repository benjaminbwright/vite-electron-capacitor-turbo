const { app, protocol, BrowserWindow } = require('electron');
const electronSquirrelStartup = require('electron-squirrel-startup');
const path = require('path');
const url = require('url')
const isDev = process.env.IS_DEV === 'true'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (!isDev) {
    mainWindow.loadFile('dist/index.html');
  } else {
    mainWindow.loadURL("http://localhost:5000/")
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // protocol.interceptFileProtocol('file', (request, callback) => {
  //   const url = request.url.substr(7)    /* all urls start with 'file://' */
  //   callback({ path: path.normalize(`${__dirname}/../dist/${url}`)})
  // }, (err) => {
  //   if (err) console.error('Failed to register protocol')
  // })
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
