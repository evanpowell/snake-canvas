import React, { Component } from 'react';

import './App.scss';

import Title from './components/title/Title';
import Settings from './components/settings/Settings';
import Game from './components/game/Game';
import GameOver from './components/gameOver/GameOver';

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

  setGameOver() {
    this.setState({
      score: 0,
      screen: 'gameOver'
    });
  }

  renderScreen() {
    switch (this.state.screen) {
      case 'game': {
        return (
          <Game
            setGameOver={() => this.setGameOver()}
            incrementScore={() => this.incrementScore()}
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
      case 'gameOver': {
        return (
          <GameOver
            startNewGame={() => this.navigate('game')}
            navigateSettings={() => this.navigate('settings')}
          ></GameOver>
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
      <div className="container">
        { this.renderScreen() }
      </div>
    );
  }
}

export default App;
