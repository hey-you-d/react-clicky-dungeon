import React from 'react';

/* https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
  May need to enable the "ignorePureComponents" action. The reason is explained below:
  https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b */
const ShopPane = () => {
  return <div className="container ingame-shoppane-container">Coming Soon</div>;
};

export default ShopPane;
