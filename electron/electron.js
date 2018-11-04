// core modules
const path = require('path');
const url = require('url');
const { ipcMain, app } = require('electron');

// my modules
const { createTray, createTrayWindow } = require('./features/tray');
const { createSettings } = require('./features/createSettings');
const breaks = require('./features/breaks');
const { assetsDir } = require('./features/common');

const baseUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

// hold onto our main tray
let tray = null;
let trayWindow = null;

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

// this is not a dock app
app.dock.hide();

// start the app up
app.on('ready', () => {
  // start up tray
  trayWindow = createTrayWindow(baseUrl);
  tray = createTray(trayWindow, assetsDir);

  // start up settings
  // this returns all the settings
  const settings = createSettings();

  // turn on settings that are enabled
  for ([settingName, settingValues] of Object.entries(settings)) {
    if (settingValues.on && featureFunctions[settingName]) {
      featureFunctions[settingName].start();
    }
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
