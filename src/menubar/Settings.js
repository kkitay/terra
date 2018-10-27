import React from 'react';
import Typist from 'react-typist';
import settingConfig from '../settings.json';

const elecSettings = window.require('electron').remote.require('electron-settings');

const toggleSetting = (name, opts) => {
  let on = opts.on
    ? false
    : true;
  elecSettings.set(name, { ...opts, on });
}

const Settings = props => {
  return (
    <Typist className="Settings" {...props.typeSettings}>
      {Object.values(settingConfig).map(({name, description}) => {
        let opts = elecSettings.get(name);
        return <label
          key={name}
          htmlFor={name}
          defaultChecked={opts.on}
          onClick={toggleSetting.bind(this, name, opts)}>
          <input type="checkbox" id={name} />
          <span>{description}</span>
        </label>;
      })}
    </Typist>
  );
}

export default Settings;