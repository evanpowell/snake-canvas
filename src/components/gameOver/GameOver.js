import React from 'react';

import './GameOver.scss';

const GameOver = (props) => {
  return (
    <div className="screen game-over">
      <h1 className="screen--title game-over__title">Game Over</h1>
      <div className="options game-over__options">
      <button
        className="options--btn"
        onClick={() => props.navigate('game')}
      >Play Again</button>
      <button
        className="options--btn"
        onClick={() => props.navigate('')}
      >Back</button>
      </div>
    </div>
  );
}

export default GameOver;
