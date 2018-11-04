const isDev = require('electron-is-dev');
const path = require('path');

const toggleWindow = (window, showWindowCB) => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindowCB();
  }
};

const assetsDir = isDev // this is set in production
  ? path.join(__dirname, '../../public/assets/') // in production our public assets are in the same folder
  : path.join(__dirname, '../assets/');

module.exports = {
  toggleWindow,
  assetsDir
};
