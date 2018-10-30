import React from 'react';
import Settings from './Settings';
import Tray from '../common/Tray';
import Typewriter from '../common/Typewriter';

const electron = window.require('electron');
const shell = electron.shell;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneTyping: []
    };
  }

  doneTyping = name => {
    console.log('done typing', name);
    this.setState({ doneTyping: [...this.state.doneTyping, name] });
  };

  render() {
    return (
      <Tray
        render={tray => (
          <div className="Main">
            {tray.startTyping && (
              <Typewriter name="Intro" doneTyping={this.doneTyping}>
                <div>I'm your digital hygienist, Terra! I can help:</div>
              </Typewriter>
            )}
            {this.state.doneTyping.includes('Intro') && (
              <Settings doneTyping={this.doneTyping} />
            )}
            {this.state.doneTyping.includes('Settings') && (
              <Typewriter name="feedback" doneTyping={this.doneTyping}>
                <button onClick={() => shell.openExternal('https://terra.fyi')}>
                  terra.fyi
                </button>
              </Typewriter>
            )}
          </div>
        )}
      />
    );
  }
}
