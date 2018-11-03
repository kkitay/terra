import React from 'react';
import './WhiteOut.css';

const { remote, ipcRenderer } = window.require('electron');
const thisWindow = remote.getCurrentWindow();

class WhiteOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: null
    };
    this.timeout = null;
  }

  show = (duration = (1000 * 30)) => {
    let seconds = duration / 1000;

    this.setState({
      style: {
        animation: `fadeio ${seconds}s linear`
      }
    });
  };

  hide = () => {
    this.setState({ style: null });
    thisWindow.hide();
  };

  componentDidMount() {
    ipcRenderer.on('fadeio', (event, duration) => {
      // add animation class
      this.show(duration);

      // remove it
      this.timeout = setTimeout(this.hide, duration);
    });

    ipcRenderer.on('skipbreak', () => {
      clearTimeout(this.timeout);
      this.hide();
    });
  }

  render() {
    return <div className="WhiteOut" style={this.state.style} />;
  }
}

export default WhiteOut;
