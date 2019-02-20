import React, { Component } from 'react';

import './App.scss';

import Title from './components/title/Title';
import Settings from './components/settings/Settings';
import Game from './components/game/Game';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: '',
      score: 0,
      wall: true,
      speed: 2
    }
  }

  navigate(screen) {
    this.setState({
      screen
    });
  }

  setWall(wall) {
    this.setState({
      wall
    });
  }

  setSpeed(speed) {
    this.setState({
      speed
    });
  }

  incrementScore() {
    this.setState({
      score: this.state.score + 1
    });
  }

  resetScore() {
    this.setState({
      score: 0
    });
  }

  setGameOver() {
    this.setState({
      screen: 'gameOver'
    });
  }

  renderScreen() {
    switch (this.state.screen) {
      case 'game': {
        return (
          <Game
            wall={this.state.wall}
            speed={this.state.speed}
            setGameOver={() => this.setGameOver()}
            incrementScore={() => this.incrementScore()}
            resetScore={() => this.resetScore()}
            navigate={(target) => this.navigate(target)}
          ></Game>
        )
      }
      case 'settings': {
        return (
          <Settings
            speed={this.state.speed}
            wall={this.state.wall}
            setWall={(wall) => this.setWall(wall)}
            setSpeed={(speed) => this.setSpeed(speed)}
            goBack={() => this.navigate('')}
          ></Settings>
        )
      }
      default: {
        return (
          <Title 
            startGame={() => this.navigate('game')}
            navigateSettings={() => this.navigate('settings')}
          ></Title>
        )
      }
    }
  }
  
  render() {
    return (
      <div>
        <div className="score-bar">
          <p className="score-bar__score">Score: {this.state.score}</p>
        </div>
        <div id="container">
          { this.renderScreen() }
        </div>
      </div>
    );
  }
}

export default App;
