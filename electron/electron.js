// core modules
const path = require('path');
const url = require('url');
const { ipcMain, app, nativeImage } = require('electron');

// my modules
const { createTray, createTrayWindow } = require('./features/tray');
const { createSettings } = require('./features/createSettings');
const eyeBreaks = require('./features/eyeBreaks');

// environ variables
const assetsDir = process.env.ELECTRON_RUN_AS_NODE // this is set in production
  ? './' // in production our public assets are in the same folder
  : path.join(__dirname, '../public/');

// make an icon
let icon = nativeImage.createFromPath(path.join(assetsDir, 'raccoon@4x.png'));
icon.setTemplateImage(true);

const baseUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

app.dock.hide();

// hold onto our main tray
let tray = null;
let trayWindow = null;

// these are our various features we gotta start/stop
const featureFunctions = {
  eyes: {
    start: () => eyeBreaks.start(baseUrl, tray),
    stop: () => eyeBreaks.stop()
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
  tray = createTray(trayWindow, icon);

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
