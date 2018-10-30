import React from 'react';
import settingConfig from '../settings.json';

const elecSettings = window
  .require('electron')
  .remote.require('electron-settings');

const toggleSetting = name => {
  let curSettings = elecSettings.get(name);
  let newOn = curSettings['on'] === true ? false : true;
  elecSettings.set(name, { ...curSettings, on: newOn });
};

const Settings = ({ TypeOut }) => {
  return TypeOut(
    'settings',
    <div className="Settings">
      {Object.values(settingConfig).map(({ name, description }) => {
        let opts = elecSettings.get(name);
        return (
          <div className="setting" key={name}>
            <input
              type="checkbox"
              id={name}
              defaultChecked={opts.on}
              onChange={() => toggleSetting(name)}
            />
            <label htmlFor={name}>{description}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Settings;
