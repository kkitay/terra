const electron = require('electron');
const { createTrayWindow, showTray } = require('../features/tray');

let tray = null;
let window = null;
let interval = null;

const takeBreak = () => {
  showTray(tray, window);
  window.webContents.send('openTray');
};

const start = (baseUrl, trayRef) => {
  console.log('start eye breaks');
  // we need this to position the tray
  tray = trayRef;
  
  // initialize hidden tray window
  window = createTrayWindow(baseUrl + '#/eyebreak');

  // on an interval, make 'er show up
  interval = setInterval(() => takeBreak(), 1000 * 60);
};

const stop = () => {
  interval = null;
};

module.exports = {
  start,
  stop
};
