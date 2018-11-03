import { BrowserWindow } from 'electron';

// Creates a big white canvas to make users stop what they're doing
export default (baseUrl, optionsOverride) => {
  const window = new BrowserWindow({
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
    ...optionsOverride,
  });

  window.maximize();
  window.setResizable(false);

  window.loadURL(baseUrl + '#/whiteout');

  window.setIgnoreMouseEvents(true);

  return window;
};
