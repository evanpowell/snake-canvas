import React, { Component } from 'react';
import axios from 'axios';

import './Game.scss';
import { startGame, config } from '../../gameLogic';
import Controls from '../controls/Controls';
import checkMobile from './checkMobile';
import GameOver from '../gameOver/GameOver';
import HighScore from '../highScore/HighScore';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.checkMobile = checkMobile;
    this.startGame = startGame;
    this.gameConfig = config;

    this.state = {
      isVertical: false,
      isHorizontalMobile: false,
      isGameOver: false,
      highScores: [],
      isHighScore: false,
      replacedScoreId: null
    }

    this.gameOver = this.gameOver.bind(this);
    this.clearSnakeRetraction = this.clearSnakeRetraction.bind(this);
    this.playAgain = this.playAgain.bind(this);
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

  componentWillUnmount() {
    this.clearSnakeRetraction();
  }
  
  clearSnakeRetraction() {
    clearInterval(this.gameConfig.retractSnake);
  }
  
  playAgain() {
    this.clearSnakeRetraction();
    this.props.resetScore();
    this.setState({
      isGameOver: false
    })
    this.startGame(this.props.wall, this.props.speed, this.gameOver, this.props.incrementScore);
  }

  gameOver() {
    let isHighScore = false;
    const { highScores } = this.state;
    const { score } = this.props;

    if (score > 0) {
      if (!highScores.length || highScores[highScores.length - 1].score < score || highScores.length < 10) {
        isHighScore = true;
      } else {
        const lowestHighScore = highScores[highScores.length - 1];

        if (lowestHighScore.score < score) {
          isHighScore = true;
          this.setState({
            replacedScoreId: lowestHighScore.id
          });
        }
      }
    }

    this.setState({
      isGameOver: true,
      isHighScore
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
          { 
            (() => {
              if (this.state.isGameOver) {
                if (this.state.isHighScore) {
                  return <HighScore score={this.props.score} wall={this.props.wall} speed={this.props.speed} replacedId={this.state.replacedScoreId} />
                }
                return <GameOver navigate={this.props.navigate} playAgain={this.playAgain} isHighScore={this.state.isHighScore}/>
              }
            })()
          }
          { controls }
        </div>
      );
    }
  }
}

export default Game;
