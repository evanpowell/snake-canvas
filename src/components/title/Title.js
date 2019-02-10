import React from 'react';

const Title = () => {
  return (
    <div className="screen">
      <h1 className="screen--title">Snake</h1>
      <div className="options">
        <button className="options--btn">Start</button>
        <button className="options--btn">Settings</button>
      </div>
    </div>
  );
}

export default Title;
