// core modules
const path = require('path');
const url = require('url');
const { ipcMain, app } = require('electron');
const { createTray, createTrayWindow } = require('./features/tray');
const { assetsDir } = require('./features/common');

// set our react base url
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
const featureFunctions = {};

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

  // initialize settings and return all of them
  const { createSettings } = require('./features/createSettings');
  const settings = createSettings();

  // add features which need access to settings
  // this must be done after app is ready
  const breaks = require('./features/breaks');
  featureFunctions.breaks = {
    start: () => breaks.start(baseUrl, tray),
    stop: () => breaks.stop()
  };

  // turn on settings that are enabled
  for (const [settingName, settingValues] of Object.entries(settings)) {
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
