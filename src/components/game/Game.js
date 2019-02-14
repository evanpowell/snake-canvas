import React, { Component } from 'react';

import './Game.scss';
import startGame from './canvas';
import Controls from '../controls/Controls';
import checkMobile from './checkMobile';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.checkMobile = checkMobile;
    this.startGame = startGame;
  }

  componentDidMount() {
    this.props.resetScore();

    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    canvas.focus();
    canvas.tabIndex = 1;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth;
    
    if (this.checkMobile()) {
      this.showControls();
    }

    this.startGame(this.props.wall, this.props.speed, this.props.setGameOver, this.props.incrementScore);
  }

  showControls() {
    const controls = document.querySelector('.controls');
    
    if (controls) {
      controls.style.display = 'block';
    }
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <canvas
          id="game"
        ></canvas>
        <Controls></Controls>
      </div>
    );
  }
}

export default Game;
