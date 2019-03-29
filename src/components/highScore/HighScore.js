import React, { Component } from 'react';
import axios from 'axios';

import './HighScore.scss';

export default class HighScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initials: ''
    }

    this.submitHighScore = this.submitHighScore.bind(this);
  }

  handleChange(event) {
    this.setState({
      initials: event.target.value
    });
  }

  submitHighScore() {
    console.log('state', this.state);
    axios.post('highScores', {
      playerName: this.state.initials,
      score: this.props.score,
      wall: this.props.wall,
      speed: this.props.speed
    }).then(({ data }) => {
      console.log('data', data);
    });
  }

  render() {
    return (
      <div className="high-score">
        <h1 className="screen--title high-score__title">High Score</h1>
        <div className="high-score__entry">
          <label htmlFor="high-score-initials">Enter Your Initials</label>
          <input type="text" id="high-score-initials" className="high-score__entry--input" value={this.state.initials}
            onChange={(e) => this.handleChange(e)} />
          <button className="high-score__submit" onClick={this.submitHighScore}>Submit Your Initials</button>
        </div>
      </div>
    )
  }
}
