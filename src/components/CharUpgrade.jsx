import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageMarkup from './ImageMarkup';

import { GLOBALCONST } from '../AppContext';

import heartPlus from '../svg/si-glyph-heart-plus.svg';
import starStick from '../svg/si-glyph-star-stick.svg';
import hamburger from '../svg/si-glyph-hamburger.svg';
import knife from '../svg/si-glyph-knife.svg';
import shield from '../svg/si-glyph-shield.svg';
import arrowLeft from '../svg/si-glyph-arrow-left.svg';
import arrowRight from '../svg/si-glyph-arrow-right.svg';

export default class CharUpgrade extends Component {
  static renderArrowImg(direction) {
    return (
      <ImageMarkup
        reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
        alt={direction === 'left' ? 'left arrow' : 'right arrow'}
        classes=""
        src=""
        dataSrc={direction === 'left' ? arrowLeft : arrowRight}
        dataSrcSet={direction === 'left' ? arrowLeft : arrowRight}
        observeInDidUpdate={false}
      />
    );
  }

  constructor(props) {
    super(props);

    const {
      SAPplayerVitalStat,
      SAPplayerAtkAttr,
      SAPplayerDefAttr,
      SAPavailableAttrPt
    } = this.props;

    this.state = {
      availablePoint: SAPavailableAttrPt,
      maxBaseHpAttr: SAPplayerVitalStat.maxHP,
      maxBaseMpAttr: SAPplayerVitalStat.maxMP,
      maxBaseStAttr: SAPplayerVitalStat.maxST,
      baseAtkAttr: SAPplayerAtkAttr,
      baseDefAttr: SAPplayerDefAttr
    };
  }

  // Total ATK = Base ATK + Weapon attack point
  calculateTotalATK() {
    const { SAPplayerEquipment } = this.props;
    const { baseAtkAttr } = this.state;

    //  non-nested obj, hence shallow comparison is ok
    return SAPplayerEquipment.sword === GLOBALCONST.INVENTORY_EMPTY_SLOT
      ? baseAtkAttr
      : baseAtkAttr + SAPplayerEquipment.sword.point[0];
  }

  // Total DEF = Base DEF + Shield defense point
  calculateTotalDEF() {
    const { SAPplayerEquipment } = this.props;
    const { baseDefAttr } = this.state;

    //  non-nested obj, hence shallow comparison is ok
    return SAPplayerEquipment.shield === GLOBALCONST.INVENTORY_EMPTY_SLOT
      ? baseDefAttr
      : baseDefAttr + SAPplayerEquipment.shield.point[0];
  }

  // Total HP = Base HP + Armour HP point
  calculateTotalHP() {
    const { SAPplayerEquipment } = this.props;
    const { maxBaseHpAttr } = this.state;

    //  non-nested obj, hence shallow comparison is ok
    return SAPplayerEquipment.armour === GLOBALCONST.INVENTORY_EMPTY_SLOT
      ? maxBaseHpAttr
      : maxBaseHpAttr + SAPplayerEquipment.armour.point[0];
  }

  okButtonClickHandler() {
    const { charUpgradeOkButtonClickHandler } = this.props;
    // prettier-ignore
    const { maxBaseHpAttr, maxBaseMpAttr, maxBaseStAttr, availablePoint, 
            baseAtkAttr, baseDefAttr } = this.state;
    // prettier-ignore
    const args = { availablePoint, maxBaseHpAttr, maxBaseMpAttr, maxBaseStAttr, 
                   baseAtkAttr, baseDefAttr };

    charUpgradeOkButtonClickHandler(args);
  }

  resetButtonClickHandler() {
    // prettier-ignore
    const { SAPplayerVitalStat, SAPplayerAtkAttr, SAPplayerDefAttr, SAPavailableAttrPt } = this.props;

    this.setState({
      availablePoint: SAPavailableAttrPt,
      maxBaseHpAttr: SAPplayerVitalStat.maxHP,
      maxBaseMpAttr: SAPplayerVitalStat.maxMP,
      maxBaseStAttr: SAPplayerVitalStat.maxST,
      baseAtkAttr: SAPplayerAtkAttr,
      baseDefAttr: SAPplayerDefAttr
    });
  }

  updateAttrPointClickHandler(attrType, mode) {
    // prettier-ignore
    const { SAPplayerVitalStat, SAPavailableAttrPt, SAPplayerAtkAttr, SAPplayerDefAttr } = this.props;
    // prettier-ignore
    const { availablePoint, maxBaseHpAttr, maxBaseMpAttr, maxBaseStAttr, 
            baseAtkAttr, baseDefAttr } = this.state;

    switch (mode) {
      case 'increase':
        if (availablePoint > 0) {
          switch (attrType) {
            case 'HP':
              this.setState({ maxBaseHpAttr: maxBaseHpAttr + 1 });
              break;
            case 'MP':
              this.setState({ maxBaseMpAttr: maxBaseMpAttr + 1 });
              break;
            case 'ST':
              this.setState({ maxBaseStAttr: maxBaseStAttr + 1 });
              break;
            case 'ATK':
              this.setState({ baseAtkAttr: baseAtkAttr + 1 });
              break;
            case 'DEF':
              this.setState({ baseDefAttr: baseDefAttr + 1 });
              break;
            default:
          }
          this.setState({ availablePoint: availablePoint - 1 });
        }
        break;
      case 'decrease':
        if (availablePoint < SAPavailableAttrPt) {
          switch (attrType) {
            case 'HP':
              if (maxBaseHpAttr > SAPplayerVitalStat.maxHP) {
                this.setState({ maxBaseHpAttr: maxBaseHpAttr - 1 });
              }
              break;
            case 'MP':
              if (maxBaseMpAttr > SAPplayerVitalStat.maxMP) {
                this.setState({ maxBaseMpAttr: maxBaseMpAttr - 1 });
              }
              break;
            case 'ST':
              if (maxBaseStAttr > SAPplayerVitalStat.maxST) {
                this.setState({ maxBaseStAttr: maxBaseStAttr - 1 });
              }
              break;
            case 'ATK':
              if (baseAtkAttr > SAPplayerAtkAttr) {
                this.setState({ baseAtkAttr: baseAtkAttr - 1 });
              }
              break;
            case 'DEF':
              if (baseDefAttr > SAPplayerDefAttr) {
                this.setState({ baseDefAttr: baseDefAttr - 1 });
              }
              break;
            default:
          }
          this.setState({ availablePoint: availablePoint + 1 });
        }
        break;
      default:
    }
  }

  render() {
    // prettier-ignore
    const { maxBaseHpAttr, maxBaseMpAttr, maxBaseStAttr, 
            availablePoint, baseAtkAttr, baseDefAttr } = this.state;

    return (
      <div className="container ingame-heropane-container">
        <div className="row">
          <div className="col-2">
            <ImageMarkup
              reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
              alt="hit point icon"
              classes=""
              src=""
              dataSrc={heartPlus}
              dataSrcSet={heartPlus}
              observeInDidUpdate={false}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-hp-decrease"
            onClick={() => this.updateAttrPointClickHandler('HP', 'decrease')}
            onKeyPress={() => this.updateAttrPointClickHandler('HP', 'decrease')}
          >
            {CharUpgrade.renderArrowImg('left')}
          </div>
          <div className="col-2 levelup-attr-slot">{maxBaseHpAttr}</div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-hp-increase"
            onClick={() => this.updateAttrPointClickHandler('HP', 'increase')}
            onKeyPress={() => this.updateAttrPointClickHandler('HP', 'increase')}
          >
            {CharUpgrade.renderArrowImg('right')}
          </div>
          <div className="col-2" />
          <div className="col-2 levelup-avail-point-indicator">{availablePoint}</div>
        </div>
        <div className="row">
          <div className="col-2">
            <ImageMarkup
              reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
              alt="magic point icon"
              classes=""
              src=""
              dataSrc={starStick}
              dataSrcSet={starStick}
              observeInDidUpdate={false}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-mp-decrease"
            onClick={() => this.updateAttrPointClickHandler('MP', 'decrease')}
            onKeyPress={() => this.updateAttrPointClickHandler('MP', 'decrease')}
          >
            {CharUpgrade.renderArrowImg('left')}
          </div>
          <div className="col-2 levelup-attr-slot">{maxBaseMpAttr}</div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-mp-increase"
            onClick={() => this.updateAttrPointClickHandler('MP', 'increase')}
            onKeyPress={() => this.updateAttrPointClickHandler('MP', 'increase')}
          >
            {CharUpgrade.renderArrowImg('right')}
          </div>
          <div className="col-2" />
          <div className="col-2" />
        </div>
        <div className="row">
          <div className="col-2">
            <ImageMarkup
              reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
              alt="stamina icon"
              classes=""
              src=""
              dataSrc={hamburger}
              dataSrcSet={hamburger}
              observeInDidUpdate={false}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-st-decrease"
            onClick={() => this.updateAttrPointClickHandler('ST', 'decrease')}
            onKeyPress={() => this.updateAttrPointClickHandler('ST', 'decrease')}
          >
            {CharUpgrade.renderArrowImg('left')}
          </div>
          <div className="col-2 levelup-attr-slot">{maxBaseStAttr}</div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-st-increase"
            onClick={() => this.updateAttrPointClickHandler('ST', 'increase')}
            onKeyPress={() => this.updateAttrPointClickHandler('ST', 'increase')}
          >
            {CharUpgrade.renderArrowImg('right')}
          </div>
          <div className="col-2" />
          <div className="col-2" />
        </div>
        <div className="row">
          <div className="col-2">
            <ImageMarkup
              reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
              alt="sword icon"
              classes=""
              src=""
              dataSrc={knife}
              dataSrcSet={knife}
              observeInDidUpdate={false}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-atk-decrease"
            onClick={() => this.updateAttrPointClickHandler('ATK', 'decrease')}
            onKeyPress={() => this.updateAttrPointClickHandler('ATK', 'decrease')}
          >
            {CharUpgrade.renderArrowImg('left')}
          </div>
          <div className="col-2 levelup-attr-slot">{baseAtkAttr}</div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-atk-increase"
            onClick={() => this.updateAttrPointClickHandler('ATK', 'increase')}
            onKeyPress={() => this.updateAttrPointClickHandler('ATK', 'increase')}
          >
            {CharUpgrade.renderArrowImg('right')}
          </div>
          <div className="col-2" />
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-point-dist-actionbtn levelup-confirm-point-dist"
            onClick={() => this.okButtonClickHandler()}
            onKeyPress={() => this.okButtonClickHandler()}
          >
            OK
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <ImageMarkup
              reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
              alt="shield icon"
              classes=""
              src=""
              dataSrc={shield}
              dataSrcSet={shield}
              observeInDidUpdate={false}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-def-decrease"
            onClick={() => this.updateAttrPointClickHandler('DEF', 'decrease')}
            onKeyPress={() => this.updateAttrPointClickHandler('DEF', 'decrease')}
          >
            {CharUpgrade.renderArrowImg('left')}
          </div>
          <div className="col-2 levelup-attr-slot">{baseDefAttr}</div>
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-attr-updatebtn tst-tag-def-increase"
            onClick={() => this.updateAttrPointClickHandler('DEF', 'increase')}
            onKeyPress={() => this.updateAttrPointClickHandler('DEF', 'increase')}
          >
            {CharUpgrade.renderArrowImg('right')}
          </div>
          <div className="col-2" />
          <div
            role="button"
            tabIndex={0}
            className="col-2 levelup-point-dist-actionbtn levelup-reset-point-dist"
            onClick={() => this.resetButtonClickHandler()}
            onKeyPress={() => this.resetButtonClickHandler()}
          >
            RESET
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            TOTAL
            <br />
            ATK
          </div>
          <div className="col-2">
            <strong>{this.calculateTotalATK()}</strong>
          </div>
          <div className="col-2">
            TOTAL
            <br />
            DEF
          </div>
          <div className="col-2">
            <strong>{this.calculateTotalDEF()}</strong>
          </div>
          <div className="col-2">
            TOTAL
            <br />
            HP
          </div>
          <div className="col-2">
            <strong>{this.calculateTotalHP()}</strong>
          </div>
        </div>
      </div>
    );
  }
}

CharUpgrade.propTypes = {
  charUpgradeOkButtonClickHandler: PropTypes.func.isRequired,
  SAPavailableAttrPt: PropTypes.number.isRequired,
  SAPplayerAtkAttr: PropTypes.number.isRequired,
  SAPplayerDefAttr: PropTypes.number.isRequired,
  SAPplayerVitalStat: PropTypes.shape(GLOBALCONST.SAP_VITAL_STAT).isRequired,
  SAPplayerEquipment: PropTypes.shape(
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired
  ).isRequired
};
