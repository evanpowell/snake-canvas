import React, { Component } from 'react';

import './Settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.getElementById(`speed${this.props.speed}`)
      .classList.add('selected');

    document.getElementById(`wall-${this.props.wall}`)
      .classList.add('selected');
  }

  setSpeed(event, speed) {
    if (speed === this.props.speed) {
      return null;
    }
    let otherOption1;
    let otherOption2;
    if (speed === 1) {
      otherOption1 = document.getElementById('speed2');
      otherOption2 = document.getElementById('speed3');
    } else if (speed === 2) {
      otherOption1 = document.getElementById('speed1');
      otherOption2 = document.getElementById('speed3');
    } else {
      otherOption1 = document.getElementById('speed1');
      otherOption2 = document.getElementById('speed2');
    }
    otherOption1.classList.remove('selected');
    otherOption2.classList.remove('selected');
    this.props.setSpeed(speed);
    event.target.classList.add('selected');
  }

  setWall(event, wall) {
    if (wall === this.props.wall) {
      return null;
    }
    this.props.setWall(wall);
    document.getElementById(`wall-${!wall}`).classList.remove('selected');
    event.target.classList.add('selected');
  }

  render() {
    return (
      <div className="screen">
        <h1 className="screen--title">Settings</h1>
        <div className="options">
          <div className="options--option">
            <p>Speed:</p>
            <span
              id="speed1"
              className="options--setting"
              onClick={(event) => this.setSpeed(event, 1)}
            >Slow</span>
            <span
              id="speed2"
              className="options--setting"
              onClick={(event) => this.setSpeed(event, 2)}
            >Normal</span>
            <span
              id="speed3"
              className="options--setting"
              onClick={(event) => this.setSpeed(event, 3)}
            >Fast</span>
          </div>
          <div className="options--option">
            <p>Wall:</p>
            <span
              id="wall-true"
              className="options--setting"
              onClick={(event) => this.setWall(event, true)}
            >On</span>
            <span
              id="wall-false"
              className="options--setting"
              onClick={(event) => this.setWall(event, false)}  
            >Off</span>
          </div>
          <button
            className="options--btn"
            onClick={this.props.goBack}
          >Back</button>
        </div>
      </div>
    );
  }
}

export default Settings;
