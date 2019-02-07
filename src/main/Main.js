import React from 'react';
import Settings from './Settings';
import Tray from '../common/Tray';
import Typewriter from '../common/Typewriter';
import './Main.css';

// check if this is a dev environment
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : false;

const raccoonPath = isDev ? '/assets/raccoon.png' : './assets/raccoon.png';
const { shell, remote } = window.require('electron');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneTyping: []
    };
  }

  doneTyping = name => {
    this.setState({ doneTyping: [...this.state.doneTyping, name] });
  };

  render() {
    return (
      <Tray
        render={tray => (
          <div className="Main">
            {tray.startTyping && (
              <Typewriter name="Intro" doneTyping={this.doneTyping}>
                <div>
                  <img
                    className="raccoon"
                    src={raccoonPath}
                    alt="Cute Raccoon"
                  />
                  I'm Raccoon. Here's what I can do:
                </div>
              </Typewriter>
            )}
            {this.state.doneTyping.includes('Intro') && (
              <Settings doneTyping={this.doneTyping} />
            )}
            {this.state.doneTyping.includes('Settings') && (
              <Typewriter name="feedback" doneTyping={this.doneTyping}>
                <button
                  onClick={() =>
                    shell.openExternal('https://raccoon.technology')
                  }
                >
                  raccoon.technology
                </button>
                <button onClick={() => remote.app.quit()}>quit</button>
              </Typewriter>
            )}
          </div>
        )}
      />
    );
  }
}
