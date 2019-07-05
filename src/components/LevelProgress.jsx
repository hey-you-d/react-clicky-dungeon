import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageMarkup from './ImageMarkup';

import medalStar from '../svg/si-glyph-medal-star.svg';

import { GLOBALCONST } from '../AppContext';

const LOCALCONST = { MAX_EXP_BAR: 14 };

export default class LevelProgress extends Component {
  renderExpPoint() {
    const { SAPplayerCurrentExp, SAPplayerTargetExp, SAPcurrentAreaId } = this.props;
    const expVal = [SAPplayerCurrentExp, '/', SAPplayerTargetExp, ' '];
    const areaLabel = ['Area', SAPcurrentAreaId];
    return (
      <div className="row">
        <div className="col-6">{areaLabel.join(' ')}</div>
        <div className="col-6">
          {expVal.join('')}
          Exp
        </div>
      </div>
    );
  }

  renderExpBar() {
    const { SAPplayerCurrentExp, SAPplayerTargetExp } = this.props;
    const table = [];
    const upperRange = Math.ceil(
      (SAPplayerCurrentExp / SAPplayerTargetExp) * LOCALCONST.MAX_EXP_BAR
    );

    for (let i = 0; i < LOCALCONST.MAX_EXP_BAR; i += 1) {
      table.push(
        <div key={i}>
          <ImageMarkup
            reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
            alt="exp icon"
            classes={i >= upperRange ? 'hidden-el' : ''}
            src=""
            dataSrc={medalStar}
            dataSrcSet={medalStar}
            observeInDidUpdate={false}
          />
        </div>
      );
    }

    return table;
  }

  render() {
    return (
      <div className="container ingame-lvprogress-container">
        {this.renderExpPoint()}
        <div className="row no-gutters ingame-lvprogress-bar">
          <div className="col-12">{this.renderExpBar()}</div>
        </div>
      </div>
    );
  }
}

LevelProgress.propTypes = {
  SAPcurrentAreaId: PropTypes.string.isRequired,
  SAPplayerCurrentExp: PropTypes.number.isRequired,
  SAPplayerTargetExp: PropTypes.number.isRequired
};
