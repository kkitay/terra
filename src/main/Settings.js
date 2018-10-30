import React from 'react';
import Typewriter from '../common/Typewriter';

const settings = window.require('electron').remote.require('electron-settings');

const descriptions = {
  eyes: 'Remind you to rest your eyes',
  meetings: 'Remind you to go to meetings'
};

const toggleSetting = name => {
  let curSettings = settings.get(name);
  let newOn = curSettings['on'] === true ? false : true;
  settings.set(name, { ...curSettings, on: newOn });
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
