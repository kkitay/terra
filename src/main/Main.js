import React from 'react';
import Settings from './Settings';
import Tray from '../common/Tray';
import Typewriter from '../common/Typewriter';
import './Main.css';
import { assetsPath } from '../lib/helpers';

const { shell, remote } = window.require('electron');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneTyping: [],
      raccoon_laugh: false,
    };
  }

  doneTyping = name => {
    this.setState({ doneTyping: [...this.state.doneTyping, name] });
  };

  toggleRaccoonLaugh(laughingState) {
    this.setState({ raccoon_laugh: laughingState });
  }

  render() {
    return (
      <Tray
        render={tray => (
          <div className="Main">
            {tray.startTyping && (
              <Typewriter name="Intro" doneTyping={this.doneTyping}>
                <div
                  onMouseEnter={() => this.toggleRaccoonLaugh(true)}
                  onMouseLeave={() => this.toggleRaccoonLaugh(false)}
                >
                  <img
                    className="raccoon"
                    src={
                      assetsPath +
                      (this.state.raccoon_laugh === true
                        ? '/raccoon_laugh.png'
                        : '/raccoon.png')
                    }
                    alt="Cute Raccoon"
                  />
                  I'm Raccoon! Here's how I can help you:
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
