import React from 'react';

import './GameOver.scss';

const GameOver = (props) => {
  return (
    <div className="screen">
      <h1 className="screen--title game-over-title">Game Over</h1>
      <div className="options">
      <button
        className="options--btn"
        onClick={props.startNewGame}
      >Play Again</button>
      <button
        className="options--btn"
        onClick={props.navigateTitle}
      >Back</button>
      </div>
    </div>
  );
}

export default GameOver;
