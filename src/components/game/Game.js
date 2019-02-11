import React, { Component } from 'react';

import './Game.scss';
import startGame from './canvas2';

class Game extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.resetScore();

    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    canvas.focus();

    startGame(canvas, ctx, this.props.wall, this.props.speed, this.props.setGameOver);
  }

  render() {
    return (
      <canvas
        id="game"
        width="400"
        height="400"
      ></canvas>
    );
  }
}

export default Game;
