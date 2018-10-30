import React, { Component } from 'react';
import Typist from 'react-typist';
import './Tray.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class Tray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTyping: false,
      doneTyping: {}
    };
  }

  componentDidMount = () => {
    ipc.on('openedTray', () => {
      this.setState({ startTyping: true });
    });
  };

  finishTyping = name => {
    let doneTyping = { [name]: true, ...this.state.doneTyping };
    this.setState({ doneTyping });
  };

  TypeOut = (name, render) => {
    return (
      <Typist
        className={name}
        avgTypingDelay={30}
        stdTypingDelay={0}
        cursor={{ show: false }}
        onTypingDone={() => this.finishTyping(name)}
      >
        {render}
      </Typist>
    );
  };

  render() {
    return (
      <div className="Tray">{this.props.render(this.state, this.TypeOut)}</div>
    );
  }
}

export default Tray;
