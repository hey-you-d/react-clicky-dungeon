import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LevelIndicator from '../components/LevelIndicator';

// Why do I have to declare a stateless component as a functional component?
// Ref: https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
const Header = props => {
  const { SAPplayerLevel } = props;
  return (
    <header>
      {/* Fixed navbar */}
      <LevelIndicator SAPplayerLevel={SAPplayerLevel} />
      <div className="container">
        <div className="row ingame-header-morestuff">
          <div className="col-6">
            Clicky Dungeon
            <sup>-Ver.0.5.0-</sup>
          </div>
          <div className="col-6">
            <span>
              <Link to="/signin"> -SIGN IN- </Link>
            </span>
            <span> | </span>
            <span>
              <Link to="/signup"> -SIGN UP- </Link>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  SAPplayerLevel: PropTypes.number.isRequired
};

// SAP -> (Redux) State As Prop
// alternatively, use getState method in the action creator function.
function mapStateToProps(state) {
  return {
    SAPplayerLevel: state.generalReducer.playerProgress.level
  };
}

export default withRouter(connect(mapStateToProps)(Header));
