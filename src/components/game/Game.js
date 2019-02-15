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

    this.state = {
      isVerticalMobile: false,
      isHorizontalMobile: false
    }
  }

  componentDidMount() {
    this.props.resetScore();

    let isHorizontalMobile = false;

    if (checkMobile()) {
      if (document.querySelector('body').offsetWidth <= 420) {
        this.setState({
          isVerticalMobile: true
        });
      } else {
        isHorizontalMobile = true;
        document.querySelector('.score-bar').style.display = 'none';
        this.setState({
          isHorizontalMobile: true
        });
      }
    }
    
    if (!isHorizontalMobile) {
      this.startGame(this.props.wall, this.props.speed, this.props.setGameOver, this.props.incrementScore);
    }
  }

  render() {
    let controls;

    if (this.state.isVerticalMobile) {
      controls = <Controls />
    }

    if (this.state.isHorizontalMobile) {
      return (
        <div className="mobile-error">
          <h3 className="mobile-error__title">Screen must be vertically oriented to play on mobile devices</h3>
          <p className="mobile-error__sub">Please rotate the screen and refresh the page</p>
        </div>
      );
    } else {
      return (
        <div className="screen">
          <canvas id="game"></canvas>
          { controls }
        </div>
      );
    }
  }
}

export default Game;
