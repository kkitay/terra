import React, { Component } from 'react';
import './Tray.css';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class Tray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTyping: false,
      restartTyping: 0
    };
    this.window = electron.remote.getCurrentWindow();
    this.trayRef = React.createRef();
  }

  componentDidMount = () => {
    ipc.on('openTray', () => {
      this.setState({
        startTyping: true,
        restartTyping: Date.now()
      });
    });
  };

  finishTyping = name => {
    let doneTyping = { [name]: true, ...this.state.doneTyping };
    this.setState({ doneTyping });
  };

  render() {
    return (
      <div className="Tray" ref={this.trayRef}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default Tray;
