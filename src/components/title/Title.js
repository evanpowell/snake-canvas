import React from 'react';

import './Title.scss';

const Title = (props) => {
  return (
    <div className="screen">
      <h1 className="screen--title main-title">Snake</h1>
      <div className="options">
        <button
          className="options--btn"
          onClick={props.startGame}
        >Start</button>
        <button
          className="options--btn"
          onClick={props.navigateSettings}
        >Settings</button>
      </div>
    </div>
  );
}

export default Title;
