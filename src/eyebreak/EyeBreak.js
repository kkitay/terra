import React from 'react';
import Tray from '../common/Tray';
import './EyeBreak.css';

const { remote } = window.require('electron');

const thisWindow = remote.getCurrentWindow();

export default class EyeBreak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 30
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        countdown: this.state.countdown > 0 ? this.state.countdown - 1 : 0
      });
    }, 1000);
  }

  render() {
    return (
      <Tray
        render={(tray, TypeOut) =>
          TypeOut(
            'eyebreak',
            <div className="EyeBreak">
              <h1>It's break time!</h1>
              <p>
                Shake out your hands and look at something in the
                distance for 20 seconds. Your body will thank you.
              </p>
              <p>{this.state.countdown}</p>
              <p>Hit ESC to <button onClick={() => thisWindow.close()}>skip this break</button>.</p>
            </div>
          )
        }
      />
    );
  }
}
