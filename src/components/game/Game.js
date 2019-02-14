import React, { Component } from 'react';

import './Game.scss';
import startGame from './canvas';

class Game extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    this.props.resetScore();

    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    canvas.focus();
    canvas.tabIndex = 1;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth;

    startGame(this.props.wall, this.props.speed, this.props.setGameOver, this.props.incrementScore);
  }

  render() {
    return (
      <canvas
        id="game"
      ></canvas>
    );
  }
}

export default Game;
