// core modules
const path = require('path');
const url = require('url');
const { app, nativeImage } = require('electron');
const _ = require('lodash/core');
const settings = require('electron-settings');
const settingConfig = require('./settings.json');

// my modules
const { createTray, createTrayWindow } = require('./electron/tray');

// make an icon
const assetsDir = path.join(__dirname, '../public/'); 
let icon = nativeImage.createFromPath(path.join(assetsDir, 'motherIconBlack@2x.png'));
icon.setTemplateImage(true);

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});

// app.dock.hide();

app.on('ready', () => {
  // add settings that are not in electron-settings
  for({ name } of Object.values(settingConfig)) {
    if(!settings.has(name)) {
      settings.set(`${name}.on`, false);
    }
  }

  // start up tray
  let trayWindow = createTrayWindow(startUrl);
  createTray(trayWindow, icon);
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})