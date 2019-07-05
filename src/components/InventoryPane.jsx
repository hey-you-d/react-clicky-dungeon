import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import ImageMarkup from './ImageMarkup';

import { GLOBALCONST } from '../AppContext';

import arrowUp from '../svg/si-glyph-arrow-up.svg';
import arrowDown from '../svg/si-glyph-arrow-down.svg';
import arrowLeft from '../svg/si-glyph-arrow-left.svg';
import arrowRight from '../svg/si-glyph-arrow-right.svg';

export default class InventoryPane extends Component {
  static renderArrowImg(type, direction) {
    return type === 'vertical' ? (
      <ImageMarkup
        reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
        alt={direction === GLOBALCONST.PREV ? 'shift prev' : 'shift next'}
        classes=""
        src=""
        dataSrc={direction === GLOBALCONST.PREV ? arrowUp : arrowDown}
        dataSrcSet={direction === GLOBALCONST.PREV ? arrowUp : arrowDown}
        observeInDidUpdate={false}
      />
    ) : (
      <ImageMarkup
        reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
        alt={direction === GLOBALCONST.PREV ? 'shift prev' : 'shift next'}
        classes=""
        src=""
        dataSrc={direction === GLOBALCONST.PREV ? arrowLeft : arrowRight}
        dataSrcSet={direction === GLOBALCONST.PREV ? arrowLeft : arrowRight}
        observeInDidUpdate={false}
      />
    );
  }

  renderHorizontalShiftBtn(direction) {
    const { showBattlePane, battlePaneUseItemBtnWasClicked, inventoryShiftBtnHandler } = this.props;
    let markup = null;

    if (showBattlePane) {
      markup = battlePaneUseItemBtnWasClicked ? (
        <div
          role="button"
          tabIndex={-1}
          className="col-xl-0 col-lg-0 col-md-4 col-sm-4 col-4 ingame-inventory-shiftbtn-portraitview"
          onClick={() => inventoryShiftBtnHandler(direction)}
          onKeyPress={() => inventoryShiftBtnHandler(direction)}
        >
          {InventoryPane.renderArrowImg('horizontal', direction)}
        </div>
      ) : (
        <div className="col-xl-0 col-lg-0 col-md-4 col-sm-4 col-4 ingame-inventory-shiftbtn-portraitview">
          {InventoryPane.renderArrowImg('horizontal', direction)}
        </div>
      );
    } else {
      markup = (
        <div
          role="button"
          tabIndex={-1}
          className="col-xl-0 col-lg-0 col-md-4 col-sm-4 col-4 ingame-inventory-shiftbtn-portraitview"
          onClick={() => inventoryShiftBtnHandler(direction)}
          onKeyPress={() => inventoryShiftBtnHandler(direction)}
        >
          {InventoryPane.renderArrowImg('horizontal', direction)}
        </div>
      );
    }

    return markup;
  }

  renderVerticalShiftBtn(direction) {
    const { showBattlePane, battlePaneUseItemBtnWasClicked, inventoryShiftBtnHandler } = this.props;
    const classNameId = GLOBALCONST.PREV
      ? 'ingame-inventory-shiftbtn-1'
      : 'ingame-inventory-shiftbtn-2';
    let markup = null;

    if (showBattlePane) {
      markup = battlePaneUseItemBtnWasClicked ? (
        <div
          role="button"
          tabIndex={-1}
          className={['col-xl-12 col-lg-12 col-md-0 col-sm-0 col-0', classNameId].join(' ')}
          onClick={() => inventoryShiftBtnHandler(direction)}
          onKeyPress={() => inventoryShiftBtnHandler(direction)}
        >
          {InventoryPane.renderArrowImg('vertical', direction)}
        </div>
      ) : (
        <div className={['col-xl-12 col-lg-12 col-md-0 col-sm-0 col-0', classNameId].join(' ')}>
          {InventoryPane.renderArrowImg('vertical', direction)}
        </div>
      );
    } else {
      markup = (
        <div
          role="button"
          tabIndex={-1}
          className={['col-xl-12 col-lg-12 col-md-0 col-sm-0 col-0', classNameId].join(' ')}
          onClick={() => inventoryShiftBtnHandler(direction)}
          onKeyPress={() => inventoryShiftBtnHandler(direction)}
        >
          {InventoryPane.renderArrowImg('vertical', direction)}
        </div>
      );
    }

    return markup;
  }

  renderInventorySlots() {
    /* prettier-ignore */
    const { SAPconsumableItems, SAPequipmentItems, showEquipmentPaneState, inventoryItemClickHandler,
            battlePaneUseItemBtnWasClicked, fromSlotIdx, toSlotIdx, showBattlePane } = this.props;

    const table = [];
    let itemList = {};
    itemList = showEquipmentPaneState ? SAPequipmentItems : SAPconsumableItems;
    let slotStyle = 'col-xl-4 col-lg-4 col-md-2 col-sm-2 col-2 ingame-inventory-itemslot';
    if (showBattlePane) {
      slotStyle = battlePaneUseItemBtnWasClicked
        ? 'col-xl-4 col-lg-4 col-md-2 col-sm-2 col-2 ingame-inventory-itemslot'
        : 'col-xl-4 col-lg-4 col-md-2 col-sm-2 col-2 ingame-inventory-itemslot-disabled';
    }

    for (let i = fromSlotIdx; i <= toSlotIdx; i += 1) {
      table.push(
        !isEqual(itemList[i], GLOBALCONST.INVENTORY_EMPTY_SLOT) ? (
          <div
            key={i}
            role="button"
            tabIndex={0}
            className={slotStyle}
            onClick={() => inventoryItemClickHandler(itemList[i], i)}
            onKeyPress={() => inventoryItemClickHandler(itemList[i], i)}
          >
            <ImageMarkup
              reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
              alt={itemList[i].name}
              classes=""
              src=""
              dataSrc={require(`../svg/${itemList[i].img}`)}
              dataSrcSet={require(`../svg/${itemList[i].img}`)}
              observeInDidUpdate
            />
          </div>
        ) : (
          <div key={i} className={slotStyle} />
        )
      );
    }

    return table;
  }

  render() {
    return (
      <div className="container ingame-inventory-container">
        <div className="row no-gutters">
          <div className="col-12">INVENTORY</div>
        </div>
        <div className="row no-gutters">
          {/* Inventory shift btn Topside - XL & L only */}
          {this.renderVerticalShiftBtn(GLOBALCONST.PREV)}
          {/* Inventory item slots */}
          {this.renderInventorySlots()}
          {/* Inventory shift btn Bottomside - XL & L only */}
          {this.renderVerticalShiftBtn(GLOBALCONST.NEXT)}
        </div>
        <div className="row no-gutters">
          {/* Inventory shift btn Rightside & Leftside - MD & SM only */}
          <div className="col-xl-0 col-lg-0 col-md-2 col-sm-2 col-2" />
          {this.renderHorizontalShiftBtn(GLOBALCONST.PREV)}
          {this.renderHorizontalShiftBtn(GLOBALCONST.NEXT)}
          <div className="col-xl-0 col-lg-0 col-md-2 col-sm-2 col-2" />
        </div>
      </div>
    );
  }
}

InventoryPane.propTypes = {
  inventoryShiftBtnHandler: PropTypes.func.isRequired,
  inventoryItemClickHandler: PropTypes.func.isRequired,
  fromSlotIdx: PropTypes.number.isRequired,
  toSlotIdx: PropTypes.number.isRequired,
  showBattlePane: PropTypes.bool.isRequired,
  battlePaneUseItemBtnWasClicked: PropTypes.bool.isRequired,
  showEquipmentPaneState: PropTypes.bool.isRequired,
  SAPequipmentItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired).isRequired,
  SAPconsumableItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired).isRequired
};
