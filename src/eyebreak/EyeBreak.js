import React from 'react';
import './EyeBreak.css';

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
      <div className="EyeBreak">
        <div className="message">
          <h1>It's time for an quick break!</h1>
          <h2>
            Shake out your hands and try to focus on something in the distance
            for 20 seconds. Your body will thank you.
          </h2>
          <h3>{this.state.countdown}</h3>
          Hit ESC to close.
        </div>
      </div>
    );
  }
}
