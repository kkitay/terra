import React from 'react';
import Typewriter from '../common/Typewriter';

const { remote, ipcRenderer } = window.require('electron');
const settings = remote.require('electron-settings');

const descriptions = {
  breaks: 'Help you take breaks every 20 minutes',
  meetings: 'Send you off to your meetings'
};

const toggleSetting = name => {
  // flip the setting value between on/off (true/false)
  let keyPath = `${name}.on`;
  let newOn = settings.get(keyPath) === true ? false : true;

  // save the setting in electron-settings
  settings.set(keyPath, newOn);

  // notify the main process to start/stop the feature
  ipcRenderer.send('toggle-feature', name, newOn);
};

const Settings = ({ doneTyping }) => {
  let allSettings = settings.getAll();

  return (
    <Typewriter name="Settings" doneTyping={doneTyping}>
      {Object.entries(allSettings).map(([name, { on }]) => {
        return (
          <div className="setting" key={name}>
            <input
              type="checkbox"
              id={name}
              defaultChecked={on}
              onChange={() => toggleSetting(name)}
            />
            <label htmlFor={name}>
              {descriptions[name] ? descriptions[name] : name}
            </label>
          </div>
        );
      })}
    </Typewriter>
  );
};

export default Settings;
