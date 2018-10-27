import React, { Component } from 'react';
import Typist from 'react-typist';
import './Menubar.css';
import Settings from './Settings';

const electron = window.require('electron');
const shell = electron.shell;
const ipc = electron.ipcRenderer;

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTyping: false,
      doneTyping: {}
    }
  }

  componentDidMount = () => {
    ipc.on('openedTray', () => {
      this.setState({ startTyping: true });
    });
  }

  typeSettings = (setting) => {
    return {
      avgTypingDelay: 20,
      stdTypingDelay: 0,
      cursor: {
        show: false
      },
      onTypingDone: this.finishTyping.bind(null, setting)
    }
  }

  finishTyping = (setting) => {
    let doneTyping = {[setting]: true, ...this.state.doneTyping};
    this.setState({ doneTyping });
  }

  openLink = (url) => {
    shell.openExternal(url);
  }

  render() {
    return (
      <div className="MenuBar">
        {this.state.startTyping
          && <Typist
          className="intro"
          {...this.typeSettings('intro')}
          >
            I'm your digital hygienist, Terra! I can help:
          </Typist>}
        {this.state.doneTyping['intro']
          && <Settings
          typeSettings={this.typeSettings('settings')}
          />}
        {this.state.doneTyping['settings']
          && <Typist
          className="feedback"
          {...this.typeSettings('feedback')}>
          <button onClick={this.openLink.bind(null, 'https://terra.fyi')}>terra.fyi</button>
          </Typist>}
      </div>
    );
  }
}

export default MenuBar;
