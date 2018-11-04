import settings from 'electron-settings';
import config from '../settings.json';

const createSettings = () => {
  // add settings that aren't enabled yet
  Object.entries(config).forEach(([name, values]) => {
    if (!settings.has(name)) {
      settings.set(`${name}.on`, values.defaultOn);
    }
  });

  // return all settings
  return settings.getAll();
};

export default createSettings;
