import React from 'react';
import PropTypes from 'prop-types';

const MoneyIndicator = props => {
  const { SAPmoney } = props;
  return (
    <div>
      <span>{SAPmoney}</span>
      &nbsp;
      <span>G</span>
    </div>
  );
};

MoneyIndicator.propTypes = {
  SAPmoney: PropTypes.number.isRequired
};

export default MoneyIndicator;
