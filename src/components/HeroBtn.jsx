import React from 'react';
import PropTypes from 'prop-types';

const HeroBtn = props => {
  const { onClickHandler } = props;
  const facialExpressions = {
    default: ["( '_' )", "('_'  )", "(  '_')"],
    hurt: '( >_< )',
    happy: ['( ^_^ )', '(^_^  )', '(  ^_^)'],
    unconscious: '(X _ X)'
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      className="ingame-uber-box ingame-profilepic-box"
      onClick={onClickHandler}
      onKeyPress={onClickHandler}
    >
      <div>
        <div>{facialExpressions.default[0]}</div>
      </div>
    </div>
  );
};

HeroBtn.propTypes = {
  onClickHandler: PropTypes.func.isRequired
};

export default HeroBtn;
