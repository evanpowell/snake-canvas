import React, { Component } from 'react';

import './Title.scss';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const optionsEl = document.querySelector('.options');
    const startEl = document.getElementById('start-btn');
    const settingsEl = document.getElementById('settings-btn');

    optionsEl.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowDown' && document.activeElement === startEl) {
        settingsEl.focus();
      } else if (key ==='ArrowUp' && document.activeElement === settingsEl) {
        startEl.focus();
      }
    });

    startEl.focus();
  }

  render() {
    return (
      <div className="screen">
        <h1 className="screen--title main-title">Snake</h1>
        <div className="options">
          <button
            className="options--btn"
            id="start-btn"
            onClick={this.props.startGame}
          >Start</button>
          <button
            className="options--btn"
            id="settings-btn"
            onClick={this.props.navigateSettings}
          >Settings</button>
        </div>
      </div>
    );
  }
}

export default Title;
