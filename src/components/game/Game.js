import React, { Component } from 'react';
import axios from 'axios';

import './Game.scss';
import startGame from './canvas';
import Controls from '../controls/Controls';
import checkMobile from './checkMobile';
import GameOver from '../gameOver/GameOver';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.checkMobile = checkMobile;
    this.startGame = startGame;

    this.state = {
      isVertical: false,
      isHorizontalMobile: false,
      isGameOver: false,
      highScores: [],
      isHighScore: false
    }

    this.gameOver = this.gameOver.bind(this);
  }

  componentWillMount() {
    let highScores;
    axios.get('highScores', {
      params: {
        wall: this.props.wall,
        speed: this.props.speed
      }
    }).then(({ data }) => {
        highScores = data.sort((a, b) => {
          if (a.score === b.score) {
            return a.createdAt - b.createdAt;
          }
          return a.score - b.score;
        });

        this.setState({
          highScores
        });
        console.log('highScores', highScores);
      });
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
      this.startGame(this.props.wall, this.props.speed, this.gameOver, this.props.incrementScore);
    }
  }

  playAgain() {
    this.props.resetScore();
    this.setState({
      isGameOver: false
    })
    this.startGame(this.props.wall, this.props.speed, this.gameOver, this.props.incrementScore);
  }

  gameOver() {
    let isHighScore = false;
    
    if (this.state.highScores.length < 10) {
      isHighScore = true;
    } else {

    }

    this.setState({
      isGameOver: true
    });
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
          { this.state.isGameOver && <GameOver navigate={this.props.navigate} playAgain={() => this.playAgain()} /> }
          { controls }
        </div>
      );
    }
  }
}

export default Game;
