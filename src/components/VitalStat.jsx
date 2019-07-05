import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageMarkup from './ImageMarkup';

import heartPlus from '../svg/si-glyph-heart-plus.svg';
import starStick from '../svg/si-glyph-star-stick.svg';
import hamburger from '../svg/si-glyph-hamburger.svg';

import { GLOBALCONST } from '../AppContext';

const LOCALCONST = { HP_IDX: 0, MP_IDX: 1, ST_IDX: 2, TOTAL_COL: 3, MAX_BAR: 10 };

export default class VitalStat extends Component {
  static renderIconRow() {
    const table = [];
    let bootstrapGridOrder = null;
    const imgSrc = [heartPlus, starStick, hamburger];
    const baseStyle = ['col-xl-4 col-lg-4 col-md-2 col-sm-2 col-2', 'ingame-vitalstat-icon'];

    for (let idx = 0; idx < LOCALCONST.TOTAL_COL; idx += 1) {
      switch (idx) {
        case LOCALCONST.HP_IDX:
          bootstrapGridOrder = 'order-xl-1 order-lg-1 order-md-1 order-sm-1 order-1';
          break;
        case LOCALCONST.MP_IDX:
          bootstrapGridOrder = 'order-xl-2 order-lg-2 order-md-3 order-sm-3 order-3';
          break;
        case LOCALCONST.ST_IDX:
          bootstrapGridOrder = 'order-xl-3 order-lg-3 order-md-5 order-sm-5 order-5';
          break;
        default:
      }

      baseStyle.push(bootstrapGridOrder);

      table.push(
        <div key={idx} className={baseStyle.join(' ')}>
          <ImageMarkup
            reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
            alt="vital stat icon"
            classes=""
            src=""
            dataSrc={imgSrc[idx]}
            dataSrcSet={imgSrc[idx]}
            observeInDidUpdate={false}
          />
        </div>
      );
    }

    return table;
  }

  renderBarRow() {
    const { SAPvitalStat } = this.props;
    const table = [];
    let vitalBar = [];
    let bootstrapGridOrder = null;
    const baseStyle = ['col-xl-4 col-lg-4 col-md-0 col-sm-0 col-0', 'ingame-vitalstat-bar'];

    for (let idx = 0; idx < LOCALCONST.TOTAL_COL; idx += 1) {
      switch (idx) {
        case LOCALCONST.HP_IDX:
          {
            // https://eslint.org/docs/rules/no-case-declarations
            bootstrapGridOrder = 'order-xl-4 order-lg-4 tstTagHpBar';
            const newRemainingHPBar = Math.floor(
              (SAPvitalStat.remainingHP / SAPvitalStat.maxHP) * LOCALCONST.MAX_BAR
            );

            for (let idx2 = 0; idx2 < LOCALCONST.MAX_BAR; idx2 += 1) {
              vitalBar.push(
                idx2 >= newRemainingHPBar ? (
                  <span key={idx2} className="hidden-el">
                    {['+', ' '].join('')}
                  </span>
                ) : (
                  <span key={idx2}>{['+', ' '].join('')}</span>
                )
              );
            }
          }
          break;
        case LOCALCONST.MP_IDX:
          {
            bootstrapGridOrder = 'order-xl-5 order-lg-5 tstTagMpBar';
            const newRemainingMPBar = Math.floor(
              (SAPvitalStat.remainingMP / SAPvitalStat.maxMP) * LOCALCONST.MAX_BAR
            );
            for (let idx2 = 0; idx2 < LOCALCONST.MAX_BAR; idx2 += 1) {
              vitalBar.push(
                idx2 >= newRemainingMPBar ? (
                  <span key={idx2} className="hidden-el">
                    {['+', ' '].join('')}
                  </span>
                ) : (
                  <span key={idx2}>{['+', ' '].join('')}</span>
                )
              );
            }
          }
          break;
        case LOCALCONST.ST_IDX:
          {
            bootstrapGridOrder = 'order-xl-6 order-lg-6 tstTagStBar';
            const newRemainingSTBar = Math.floor(
              (SAPvitalStat.remainingST / SAPvitalStat.maxST) * LOCALCONST.MAX_BAR
            );
            for (let idx2 = 0; idx2 < LOCALCONST.MAX_BAR; idx2 += 1) {
              vitalBar.push(
                idx2 >= newRemainingSTBar ? (
                  <span key={idx2} className="hidden-el">
                    {['+', ' '].join('')}
                  </span>
                ) : (
                  <span key={idx2}>{['+', ' '].join('')}</span>
                )
              );
            }
          }
          break;
        default:
      }

      baseStyle.push(bootstrapGridOrder);

      table.push(
        <div key={idx} className={baseStyle.join(' ')}>
          <div>{vitalBar}</div>
        </div>
      );

      baseStyle.pop();
      vitalBar = [];
    }

    return table;
  }

  renderNumberRow() {
    const { SAPvitalStat } = this.props;
    const table = [];
    let bootstrapGridOrder = null;
    let vitalStat = (
      <React.Fragment>
        <div>999</div>
        <div>999</div>
      </React.Fragment>
    );
    const baseStyle = ['col-xl-4 col-lg-4 col-md-2 col-sm-2 col-2', 'ingame-vitalstat-number'];

    for (let idx = 0; idx < LOCALCONST.TOTAL_COL; idx += 1) {
      switch (idx) {
        case LOCALCONST.HP_IDX:
          bootstrapGridOrder = 'order-xl-7 order-lg-7 order-md-2 order-sm-2 order-2 tstTagHpNum';
          vitalStat = (
            <React.Fragment>
              <div>{SAPvitalStat.remainingHP}</div>
              <div>{SAPvitalStat.maxHP}</div>
            </React.Fragment>
          );
          break;
        case LOCALCONST.MP_IDX:
          bootstrapGridOrder = 'order-xl-8 order-lg-8 order-md-4 order-sm-4 order-4 tstTagMpNum';
          vitalStat = (
            <React.Fragment>
              <div>{SAPvitalStat.remainingMP}</div>
              <div>{SAPvitalStat.maxMP}</div>
            </React.Fragment>
          );
          break;
        case LOCALCONST.ST_IDX:
          bootstrapGridOrder = 'order-xl-9 order-lg-9 order-md-6 order-sm-6 order-6 tstTagStNum';
          vitalStat = (
            <React.Fragment>
              <div>{SAPvitalStat.remainingST}</div>
              <div>{SAPvitalStat.maxST}</div>
            </React.Fragment>
          );
          break;
        default:
      }

      baseStyle.push(bootstrapGridOrder);

      table.push(
        <div key={idx} className={baseStyle.join(' ')}>
          {vitalStat}
        </div>
      );

      baseStyle.pop();
    }

    return table;
  }

  render() {
    return (
      <div className="container ingame-vitalstat-container">
        <div className="row no-gutters">
          <div className="col-12">VITAL STAT</div>
        </div>
        <div className="row no-gutters">
          {VitalStat.renderIconRow()}
          {this.renderBarRow()}
          {this.renderNumberRow()}
        </div>
      </div>
    );
  }
}

VitalStat.propTypes = {
  SAPvitalStat: PropTypes.shape(GLOBALCONST.SAP_VITAL_STAT).isRequired
};
