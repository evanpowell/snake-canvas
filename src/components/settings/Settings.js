import React, { Component } from 'react';

import './Settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const speedLabel = document.getElementById('speed-label');
    const wallLabel = document.getElementById('wall-label');
    const backButton = document.getElementById('back-btn');

    speedLabel.addEventListener('keydown', ({ key }) => {

      if (key === 'ArrowLeft' && this.props.speed > 1) {

        this.props.setSpeed(this.props.speed - 1);

      } else if (key === 'ArrowRight' && this.props.speed < 3) {

        this.props.setSpeed(this.props.speed + 1);

      } else if (key === 'ArrowDown') {

        wallLabel.focus();

      }

    });

    wallLabel.addEventListener('keydown', ({ key }) => {

      if (key === 'ArrowLeft' && !this.props.wall) {

        this.props.setWall(true);

      } else if (key === 'ArrowRight' && this.props.wall) {

        this.props.setWall(false);

      } else if (key === 'ArrowUp') {

        speedLabel.focus();

      } else if (key === 'ArrowDown') {

        backButton.focus();

      }
      
    });

    backButton.addEventListener('keydown', ({ key }) => {
      
      if (key === 'ArrowUp') {
        wallLabel.focus();
      }

    });

    speedLabel.focus();
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
        <div className="options options--settings">
          <div className="options--option" id="speed-option">
            <p id="speed-label" tabIndex="1">Speed:</p>
            <div>
              <span
                id="speed1"
                className={'options--setting' + (this.props.speed === 1 ? ' selected' : '')}
                onClick={() => this.props.setSpeed(1)}
                >Slow</span>
              <span
                id="speed2"
                className={'options--setting' + (this.props.speed === 2 ? ' selected' : '')}
                onClick={() => this.props.setSpeed(2)}
                >Normal</span>
              <span
                id="speed3"
                className={'options--setting' + (this.props.speed === 3 ? ' selected' : '')}
                onClick={() => this.props.setSpeed(3)}
              >Fast</span>
            </div>
          </div>
          <div className="options--option" id="wall-option">
            <p id="wall-label" tabIndex="2">Wall:</p>
            <div>
              <span
                id="wall-true"
                className={'options--setting' + (this.props.wall ? ' selected' : '')}
                onClick={(event) => this.setWall(event, true)}
                >On</span>
              <span
                id="wall-false"
                className={'options--setting' + (this.props.wall ? '' : ' selected')}
                onClick={(event) => this.setWall(event, false)}  
              >Off</span>
            </div>
          </div>
          <button
            id="back-btn"
            className="options--btn"
            onClick={this.props.goBack}
          >Back</button>
        </div>
      </div>
    );
  }
}

export default Settings;
