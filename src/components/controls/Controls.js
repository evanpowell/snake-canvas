import React, { Component } from 'react';

import './Controls.scss';

const changeDirection = (key) => {
  document.getElementById('game').dispatchEvent(
    new KeyboardEvent('keydown', { key })
  );
};

const Controls = (props) => {
  return(
    <div className="controls">
      <button 
        className="controls__btn controls__btn--up"
        onClick={() => changeDirection('ArrowUp')}
      >&uarr;</button>
      <button 
        className="controls__btn controls__btn--right"
        onClick={() => changeDirection('ArrowRight')}
      >&rarr;</button>
      <button 
        className="controls__btn controls__btn--down"
        onClick={() => changeDirection('ArrowDown')}
      >&darr;</button>
      <button 
        className="controls__btn controls__btn--left"
        onClick={() => changeDirection('ArrowLeft')}
      >&larr;</button>
    </div>
  );
}

export default Controls;