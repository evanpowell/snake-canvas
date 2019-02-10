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

  renderScreen() {
    switch (this.state.screen) {
      case 'game': {
        return <Game></Game>
      }
      case 'settings': {
        return <Settings></Settings>
      }
      case 'gameOver': {
        return <GameOver></GameOver>
      }
      default: {
        return <Title></Title>
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
