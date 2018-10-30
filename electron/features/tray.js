const { BrowserWindow, Tray } = require('electron');
const { toggleWindow } = require('./toggleWindow');

// Creates the tray icon itself
const createTray = (trayWindow, icon) => {
  let tray = new Tray(icon);

  // toggle the tray window when clicking the tray icon.
  tray.on('click', function(event) {
    trayWindow.webContents.send('openTray');

    toggleWindow(trayWindow, () => {
      showTray(tray, trayWindow);
      trayWindow.focus();
    });

    if (trayWindow.isVisible() && process.defaultApp && event.metaKey) {
      trayWindow.openDevTools({ mode: 'detach' });
    }
  });

  // The window opened directly from the tray needs to go away on blur.
  trayWindow.on('blur', () => {
    if (!trayWindow.webContents.isDevToolsOpened()) {
      trayWindow.hide();
    }
  });

  return tray;
};

// Creates a tray window
// I use this multiple times to create windows adjacent to the tray icon
const createTrayWindow = (Url, optionsOverride = {}) => {
  let window = new BrowserWindow({
    width: 300,
    height: 300,
    useContentSize: true,
    show: false,
    resizable: false,
    frame: false,
    hasShadow: true,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    },
    ...optionsOverride
  });

  window.loadURL(Url);

  return window;
};

const showTray = (tray, trayWindow) => {
  const trayPos = tray.getBounds();
  const windowPos = trayWindow.getBounds();

  let x = 0;
  let y = 0;

  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
    y = Math.round(trayPos.y + trayPos.height);
  } else {
    x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
    y = Math.round(trayPos.y + trayPos.height * 10);
  }

  trayWindow.setPosition(x, y, false);
  trayWindow.showInactive();
};

module.exports = {
  createTray,
  createTrayWindow,
  showTray
};
