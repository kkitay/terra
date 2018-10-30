const settings = require('electron-settings');
const config = require('../settings.json');

const createSettings = () => {
  // add settings that aren't enabled yet
  for ([name, values] of Object.entries(config)) {
    if (!settings.has(name)) {
      settings.set(`${name}.on`, values.defaultOn);
    }
  }

  // return all settings
  return settings.getAll();
};

module.exports = { createSettings };
