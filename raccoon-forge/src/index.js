import path from 'path';
import { app, ipcMain } from 'electron';
// import installExtension, {
//   REACT_DEVELOPER_TOOLS
// } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

import createSettings from './main/settings';
import { createTray, createTrayWindow } from './main/tray';
import breaks from './main/breaks';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray = null;
let trayWindow = null;

// dev mode
const isDevMode = process.execPath.match(/[\\/]electron/);
if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

// base urls
const baseUrl = `file://${__dirname}/index.html`;
const assetsDir = `file://${__dirname}/assets/`;

// these are our various features we gotta start/stop
const featureFunctions = {
  breaks: {
    start: () => breaks.start(baseUrl, tray),
    stop: () => breaks.stop()
  }
};

// if a user turns on the setting in the renderer, flip it on here
ipcMain.on('toggle-feature', (event, feature, onOffBool) => {
  if (featureFunctions[feature]) {
    // true = turn it on
    if (onOffBool) {
      featureFunctions[feature].start();
    }
    // false = turn it off
    else {
      featureFunctions[feature].stop();
    }
  }
});

// start the app up
app.on('ready', () => {
  // start up tray
  trayWindow = createTrayWindow(baseUrl);
  tray = createTray(trayWindow, assetsDir);
  console.log(tray);

  // start up settings
  // this returns all the settings
  const settings = createSettings();

  // turn on settings that are enabled
  Object.entries(settings).forEach(([name, values]) => {
    if (values.on && featureFunctions[name]) {
      featureFunctions[name].start();
    }
  });
});

// const createWindow = async () => {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//   });

//   // and load the index.html of the app.
//   mainWindow.loadURL(baseUrl);

//   // Open the DevTools.
//   if (isDevMode) {
//     await installExtension(REACT_DEVELOPER_TOOLS);
//     mainWindow.webContents.openDevTools();
//   }

//   // Emitted when the window is closed.
//   mainWindow.on('closed', () => {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null;
//   });
// };

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
