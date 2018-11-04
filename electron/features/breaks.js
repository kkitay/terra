const { ipcMain, globalShortcut } = require('electron');
const settings = require('electron-settings');
const { createTrayWindow, showTray } = require('./tray');
const { createWhiteWindow } = require('./whiteWindow.js');

const BREAK_INTERVAL = settings.get('breaks.intervalMins') * 1000 * 60;
const BREAK_TIME = 1000 * 30; // 30 seconds

let tray = null;
let trayWindow = null;
let whiteWindow = null;
let interval = null;

const showWhiteWindow = () => {
  whiteWindow.showInactive();
  whiteWindow.webContents.send('fadeio', BREAK_TIME);
};

const showTrayWindow = () => {
  showTray(tray, trayWindow);
  trayWindow.webContents.send('openTray', BREAK_TIME);
};

const skipBreak = () => {
  whiteWindow.webContents.send('skipbreak');
  trayWindow.webContents.send('skipbreak');
};

const takeBreak = () => {
  showWhiteWindow();
  showTrayWindow();

  // register shortcut then set a timeout to unregister it
  globalShortcut.register('Esc', () => {
    skipBreak();
  });
  setTimeout(() => {
    globalShortcut.unregisterAll();
  }, BREAK_TIME);

  // listen for skipping break
  ipcMain.on('skipbreak', () => {
    skipBreak();
  });
};

const start = (baseUrl, trayRef) => {
  // we need this to position the tray
  tray = trayRef;

  // initialize hidden trayWindow
  trayWindow = createTrayWindow(baseUrl + '#/break');

  // initialize hidden whiteWindow
  whiteWindow = createWhiteWindow(baseUrl);

  // on an interval, make 'er show up
  interval = setInterval(() => takeBreak(), BREAK_INTERVAL);
};

const stop = () => {
  clearInterval(interval);
};

module.exports = {
  start,
  stop
};
