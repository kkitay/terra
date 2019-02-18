const isDev = require('electron-is-dev');
const path = require('path');
// const { getDoNotDisturb } = require('@meetfranz/electron-notification-state');

const doNotDisturb = () => {
  // const disturbState = getDoNotDisturb();
  // return disturbState;
  return false;
}

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
  assetsDir,
  isDev,
  doNotDisturb
};
