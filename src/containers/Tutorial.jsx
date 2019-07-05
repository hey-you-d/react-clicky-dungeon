import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const Tutorial = () => {
  return (
    <div className="FlexiHeightContainer">
      <div className="ThemeContainer">
        <h1>Tutorial</h1>
        <p>How to survive the adventure & of course, triumph!</p>
        <hr />
        <p>Coming Soon</p>
        <div>
          <Link to="/"> -Alright I am ready for the adventure!- </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect()(Tutorial));
