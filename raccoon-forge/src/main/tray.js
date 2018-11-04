import path from 'path';
import { app, BrowserWindow, Tray, nativeImage } from 'electron';
import toggleWindow from './toggleWindow';

// Creates the tray icon itself
export const createTray = (trayWindow, assetsDir) => {
  const icon = nativeImage.createFromPath(path.join(assetsDir, 'Raccoon@4x.png'));
  icon.setTemplateImage(true);
  const tray = new Tray(icon);

  // toggle the tray window when clicking the tray icon.
  tray.on('click', event => {
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
export const createTrayWindow = Url => {
  const window = new BrowserWindow({
    width: 300,
    height: 300,
    useContentSize: true,
    show: false,
    resizable: false,
    frame: false,
    hasShadow: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  window.loadURL(Url);

  return window;
};

export const showTray = (tray, trayWindow) => {
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
