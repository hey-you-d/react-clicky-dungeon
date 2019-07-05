import React from 'react';
import PropTypes from 'prop-types';

const LevelIndicator = props => {
  const { SAPplayerLevel } = props;
  return (
    <div className="ingame-uber-box ingame-charlevel-box">
      <div>{SAPplayerLevel}</div>
    </div>
  );
};

LevelIndicator.propTypes = {
  SAPplayerLevel: PropTypes.number.isRequired
};

export default LevelIndicator;
