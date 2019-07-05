import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageMarkup from './ImageMarkup';

import { GLOBALCONST } from '../AppContext';

export default class BoardCell extends Component {
  static generateImageTag(entityArray, content) {
    let output;

    entityArray.forEach(_item => {
      if (content === _item.id) {
        output = (
          <ImageMarkup
            reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
            alt={_item.name !== undefined ? _item.name : 'board cell icon'}
            classes=""
            src=""
            dataSrc={require(`../svg/${_item.img}`)}
            dataSrcSet={require(`../svg/${_item.img}`)}
            observeInDidUpdate
          />
        );
      }
    });

    return output;
  }

  revealedTileClickAction() {
    const {
      content,
      enemyTypes,
      itemTypes,
      equipmentTypes,
      doorTypes,
      thisTileIdx,
      updateTileStateHandler,
      obtainItemHandler,
      setShowBattlePaneStates,
      setShowModalWindowStates
    } = this.props;

    const doors = [GLOBALCONST.AREA_MAP_START_TILE_ID, GLOBALCONST.AREA_MAP_EXIT_TILE_ID];
    if (!doors.includes(content)) {
      switch (content.substring(0, 1)) {
        case 'E':
          enemyTypes.forEach(_item => {
            if (_item.id === content) {
              setShowBattlePaneStates(true, Object.assign({}, _item, { tileIdx: thisTileIdx }));
            }
          });
          break;
        case 'I':
          itemTypes.forEach(_item => {
            if (_item.id === content) {
              switch (content) {
                case 'I-4': {
                  // https://eslint.org/docs/rules/no-case-declarations
                  // coins / money
                  const randomIdx = Math.floor(Math.random() * (_item.point.length - 1) + 1);
                  const coinValue = _item.point[randomIdx];
                  obtainItemHandler(_item, GLOBALCONST.ITEM_TYPE_COINS, coinValue);

                  break;
                }
                default:
                  // Consumable Items
                  obtainItemHandler(_item, GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM);
              }
              updateTileStateHandler(thisTileIdx, GLOBALCONST.TILE_STATE_EXPLORED);
            }
          });
          break;
        case 'A':
        case 'W':
        case 'S':
          equipmentTypes.forEach(_item => {
            if (_item.id === content) {
              obtainItemHandler(_item, GLOBALCONST.ITEM_TYPE_EQUIPMENT);
              updateTileStateHandler(thisTileIdx, GLOBALCONST.TILE_STATE_EXPLORED);
            }
          });
          break;
        default:
      }
    } else if (content === GLOBALCONST.AREA_MAP_EXIT_TILE_ID) {
      const modalMsg = (
        <div className="modalContentContainer">
          <div className="modalContent">
            <div className="modalImg">
              <ImageMarkup
                reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                alt="Exit Door"
                classes=""
                src=""
                dataSrc={require(`../svg/${doorTypes[1].img}`)}
                dataSrcSet={require(`../svg/${doorTypes[1].img}`)}
                observeInDidUpdate={false}
              />
            </div>
            <h3>Go to next area?</h3>
            <div>You will not be able to head back</div>
            <div>to this area.</div>
          </div>
        </div>
      );

      setShowModalWindowStates(
        GLOBALCONST.MODAL_WINDOW.CONFIRMATION,
        GLOBALCONST.MODAL_WINDOW_CONTEXT.TO_NEXT_AREA,
        modalMsg,
        'Go',
        'Stay',
        {}
      );
    }
  }

  renderTileFowMode() {
    const { content, isStartTile, thisTileIdx, updateTileStateHandler } = this.props;

    if (isStartTile) {
      return this.renderTileExploredMode();
    }

    const tileStateUpdateTo =
      content === GLOBALCONST.BOARD_TILE_X
        ? GLOBALCONST.TILE_STATE_EXPLORED
        : GLOBALCONST.TILE_STATE_REVEALED;

    return (
      <div
        role="button"
        tabIndex="-1"
        className="col-2 board-tile-fow-mode"
        onClick={() => updateTileStateHandler(thisTileIdx, tileStateUpdateTo)}
        onKeyPress={() => updateTileStateHandler(thisTileIdx, tileStateUpdateTo)}
      />
    );
  }

  renderTileRevealMode() {
    const { content, enemyTypes, itemTypes, equipmentTypes, doorTypes } = this.props;

    let output = <div className="col-2 board-tile-reveal-mode" />;
    let inGameObjTypes = {};

    const doors = [GLOBALCONST.AREA_MAP_START_TILE_ID, GLOBALCONST.AREA_MAP_EXIT_TILE_ID];
    if (!doors.includes(content)) {
      switch (content.substring(0, 1)) {
        case 'E':
          // Type: Enemy
          inGameObjTypes = enemyTypes;
          break;
        case 'I':
          // Type: Item
          inGameObjTypes = itemTypes;
          break;
        case 'A':
        case 'W':
        case 'S':
          // Type: armor / weapon / shield
          inGameObjTypes = equipmentTypes;
          break;
        default:
          // the default will be "explored"
          inGameObjTypes = {};
      }

      if (inGameObjTypes !== {}) {
        output = (
          <div
            role="button"
            tabIndex="-1"
            className="col-2 board-tile-reveal-mode"
            onClick={() => this.revealedTileClickAction()}
            onKeyPress={() => this.revealedTileClickAction()}
          >
            {BoardCell.generateImageTag(inGameObjTypes, content)}
          </div>
        );
      } else {
        // the default will be "explored"
        output = this.renderTileExploredMode();
      }
    } else {
      // Type: Door
      // except the "START" tile of which during the initial rendering has been set to "explored" mode.
      output = ![GLOBALCONST.AREA_MAP_START_TILE_ID].includes(content) ? (
        <div
          role="button"
          tabIndex="-1"
          className="col-2 board-tile-reveal-mode"
          onClick={() => this.revealedTileClickAction()}
          onKeyPress={() => this.revealedTileClickAction()}
        >
          {BoardCell.generateImageTag(doorTypes, content)}
        </div>
      ) : null;
    }
    return output;
  }

  renderTileExploredMode() {
    const { isStartTile, content, doorTypes } = this.props;

    return (
      <div className="col-2 board-tile-explored-mode">
        {isStartTile ? BoardCell.generateImageTag(doorTypes, content) : null}
      </div>
    );
  }

  render() {
    const { thisTileIdx, tilesModeState } = this.props;

    let conditionalRendering = this.renderTileFowMode();
    switch (tilesModeState[thisTileIdx]) {
      case GLOBALCONST.TILE_STATE_REVEALED:
        conditionalRendering = this.renderTileRevealMode();
        break;
      case GLOBALCONST.TILE_STATE_EXPLORED:
        conditionalRendering = this.renderTileExploredMode();
        break;
      default:
        conditionalRendering = this.renderTileFowMode();
    }

    return <React.Fragment>{conditionalRendering}</React.Fragment>;
  }
}

BoardCell.propTypes = {
  isStartTile: PropTypes.bool.isRequired,
  thisTileIdx: PropTypes.number.isRequired,
  tilesModeState: PropTypes.arrayOf(PropTypes.string).isRequired,
  obtainItemHandler: PropTypes.func.isRequired,
  setShowBattlePaneStates: PropTypes.func.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired,
  updateTileStateHandler: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  enemyTypes: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ENEMY)).isRequired,
  itemTypes: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)).isRequired,
  equipmentTypes: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)).isRequired,
  doorTypes: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_DOOR)).isRequired
};
