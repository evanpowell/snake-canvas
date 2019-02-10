import React from 'react';

import './Settings.scss';

const Settings = (props) => {
  return (
    <div className="screen">
      <h1 className="screen--title">Settings</h1>
      <div className="options">
        <div className="options--option">
          <p>Speed:</p>
          <span className="options--setting">Slow</span>
          <span className="options--setting selected">Normal</span>
          <span className="options--setting">Fast</span>
        </div>
        <div className="options--option">
          <p>Wall:</p>
          <span className="options--setting selected">On</span>
          <span className="options--setting">Off</span>
        </div>
        <button 
          className="options--btn"
          onClick={props.goBack}
        >Back</button>
      </div>
    </div>
  );
}

export default Settings;
