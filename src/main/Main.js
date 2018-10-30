import React from 'react';
import Settings from './Settings';
import Tray from '../common/Tray';

const electron = window.require('electron');
const shell = electron.shell;

const Main = (tray, TypeOut) => {
  return (
    <div className="Main">
      {tray.startTyping &&
        TypeOut(
          'intro',
          <div>I'm your digital hygienist, Terra! I can help:</div>
        )}
      {tray.doneTyping['intro'] && <Settings TypeOut={TypeOut} />}
      {tray.doneTyping['settings'] &&
        TypeOut(
          'feedback',
          <button onClick={() => shell.openExternal('https://terra.fyi')}>
            terra.fyi
          </button>
        )}
    </div>
  );
};

export default () => <Tray render={Main} />;
