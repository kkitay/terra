// core modules
const path = require('path');
const url = require('url');
const { ipcMain, app, nativeImage } = require('electron');
const _ = require('lodash/core');
const settings = require('electron-settings');
const settingConfig = require('./settings.json');

// my modules
const { createTray, createTrayWindow } = require('./electron/tray');
const eyeBreaks = require('./electron/eyeBreaks');

// make an icon
const assetsDir = path.join(__dirname, '../public/');
let icon = nativeImage.createFromPath(
  path.join(assetsDir, 'motherIconBlack@2x.png')
);
icon.setTemplateImage(true);

const baseUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

// app.dock.hide();

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
ipcMain.on('turn-feature-on', (event, feature, onOffBool) => {
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

  // instantiate settings
  for ({ name } of Object.values(settingConfig)) {
    if (settings.has(name)) {
      // turn it on if it's enabled
      let vals = settings.get(name);
      if (vals.on === true && featureFunctions[name]) {
        featureFunctions[name].start();
      }
    } else {
      // add it if there is no setting
      settings.set(`${name}.on`, false);
    }
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
