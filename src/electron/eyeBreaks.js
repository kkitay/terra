const electron = require('electron');
const { BrowserWindow } = electron;

require('electron-reload')(null, {
  electron: require(`${__dirname}/../../node_modules/electron`)
});

let interval = null;
let window = null;

const eyeBreak = (url) => {
  let display = electron.screen.getPrimaryDisplay();
  let maxSize = display.workAreaSize;
  window = new BrowserWindow({
    height: maxSize.height + 300,
    width: maxSize.width,
    show: false,
    frame: false,
    hasShadow: false,
    resizable: false,
    alwaysOnTop: true,
    transparent: true,
    simpleFullscreen: true
  });
  window.loadURL(url + '#/eyebreak');
  window.setIgnoreMouseEvents(true);
};

const start = () => {
  interval = setInterval(() => {
    window.show();
    setTimeout(() => {
      window.hide();
    }, (1000 * 30));
  }, (1000 * 60));
};

const stop = () => {
  interval = null;
};

module.exports = {
  start,
  stop
}