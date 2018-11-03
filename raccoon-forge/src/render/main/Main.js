import React from 'react';
import Settings from './Settings';
import Tray from '../common/Tray';
import Typewriter from '../common/Typewriter';
import './Main.css';

const { shell } = window.require('electron');

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
                    src="/icon.png"
                    alt="Cute Raccoon"
                  />
                  I'm the Digital Wellbeing Raccoon. Here's what I do:
                </div>
              </Typewriter>
            )}
            {this.state.doneTyping.includes('Intro') && (
              <Settings doneTyping={this.doneTyping} />
            )}
            {this.state.doneTyping.includes('Settings') && (
              <Typewriter name="feedback" doneTyping={this.doneTyping}>
                <button onClick={() => shell.openExternal('https://terra.fyi')}>
                  raccoon.technology
                </button>
              </Typewriter>
            )}
          </div>
        )}
      />
    );
  }
}
