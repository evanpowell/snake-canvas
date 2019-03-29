import React, { Component } from 'react';

import './GameOver.scss';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const playAgainButton = document.getElementById('play-again-btn');
    const backButton = document.getElementById('back-btn');

    playAgainButton.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowDown') {
        backButton.focus();
      }
    });

    backButton.addEventListener('keydown', ({ key }) => {
      if (key ==='ArrowUp') {
        playAgainButton.focus();
      }
    });

    setTimeout(() => {
      playAgainButton.focus();
    }, 2000);
  }

  goBack() {
    this.props.navigate('');
  }

  render() {
    return (
      <div className="game-over">
        <h1 className="screen--title game-over__title">Game Over</h1>
        <div className="options game-over__options">
        <button
          id="play-again-btn"
          className="options--btn"
          onClick={this.props.playAgain}
        >Play Again</button>
        <button
          id="back-btn"
          className="options--btn"
          onClick={this.goBack}
        >Back</button>
        </div>
      </div>
    );
  }
}

export default GameOver;
