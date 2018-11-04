const settings = require('electron-settings');
const isDev = require('electron-is-dev');

const defaultSettings = {
  breaks: {
    on: false,
    intervalMins: 20
  }
};

const createSettings = () => {
  if (isDev) {
    settings.setAll({});
  }

  // add settings that aren't enabled yet
  Object.entries(defaultSettings).forEach(([groupName, groupSettings]) => {
    // loop through each property
    Object.entries(groupSettings).forEach(([settingName, defaultValue]) => {
      let keyPath = `${groupName}.${settingName}`;
      if (!settings.has(keyPath)) {
        settings.set(keyPath, defaultValue);
      }
    });
  });

  // return all settings
  return settings.getAll();
};

module.exports = { createSettings };
