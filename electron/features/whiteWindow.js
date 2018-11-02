const { BrowserWindow } = require('electron');

// Creates a big white canvas to make users stop what they're doing
const createWhiteWindow = (BaseUrl, optionsOverride = {}) => {
  let window = new BrowserWindow({
    simpleFullscreen: true,
    show: false,
    useContentSize: true,
    alwaysOnTop: true,
    frame: false,
    hasShadow: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    },
    ...optionsOverride
  });

  window.maximize();
  window.setResizable(false);

  window.loadURL(BaseUrl + '#/whiteout');

  window.setIgnoreMouseEvents(true);

  return window;
};

module.exports = {
  createWhiteWindow
};
