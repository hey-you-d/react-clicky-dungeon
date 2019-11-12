import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import ImageMarkup from '../components/ImageMarkup';
import StartButton from '../components/StartButton';
import LevelProgress from '../components/LevelProgress';
import InventoryPane from '../components/InventoryPane';
import VitalStat from '../components/VitalStat';
import CentrePane from './CentrePane';

import { GLOBALCONST } from '../AppContext';

import {
  setVitalStat,
  removeInventoryItem,
  equip,
  getNextArea,
  gainExp,
  markATileAsExplored,
  expandInventory
} from '../actions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.lootedItemImg = React.createRef();

    // TODO: Pass it to the StartButton component
    /*
    this.state = {
      startBtnClassNames: 'start-button show-start-button',
      loadingTxtClassNames: 'hide-start-button'
    };
    */

    this.inventoryShiftBtnHandler = this.inventoryShiftBtnHandler.bind(this);
    this.inventoryItemClickHandler = this.inventoryItemClickHandler.bind(this);
    this.startBtnClickEventHandler = this.startBtnClickEventHandler.bind(this);
    this.battlePaneRunBtnClickHandler = this.battlePaneRunBtnClickHandler.bind(this);
    this.battlePaneBattleOverEventHandler = this.battlePaneBattleOverEventHandler.bind(this);
  }

  /* *******************************************************************************************
   *  Path: Main -> StartButton
   *
   *  through "renderStartBtnPane" function in this component.
   * *******************************************************************************************
   */
  startBtnClickEventHandler(e) {
    e.preventDefault();

    // TODO : hide the start button, show the loading animation


    const { DAPgetNextArea, SAPnextAreaId } = this.props;
    DAPgetNextArea(SAPnextAreaId);

    // DEV TEMP FEATURE ACTIVATION - START
    /*
    const { DAPexpandInventory, DAPgainExp } = this.props;
    DAPexpandInventory();
    DAPexpandInventory();
    DAPgainExp(201);
    */
    // DEV TEMP FEATURE ACTIVATION - END
  }

  /* *******************************************************************************************
   * Path: Main -> InventoryPane
   * through render function
   *
   * Will be called by "renderVerticalShiftBtn" & "renderHorizontalShiftBtn" function in
   * InventoryPane.
   * ********************************************************************************************
   */
  inventoryShiftBtnHandler(direction) {
    const {
      SAPconsumableItems,
      SAPcurrentAreaId,
      inventoryPaneFromSlotIdx,
      inventoryPaneToSlotIdx,
      setInventoryPaneSlotIdx
    } = this.props;

    switch (direction) {
      case GLOBALCONST.PREV:
        if (inventoryPaneFromSlotIdx > 0 && SAPcurrentAreaId !== GLOBALCONST.EPOCH_AREA_ID) {
          setInventoryPaneSlotIdx(
            inventoryPaneFromSlotIdx - GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
            inventoryPaneToSlotIdx - GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET
          );
        }
        break;
      case GLOBALCONST.NEXT:
        if (
          inventoryPaneToSlotIdx < SAPconsumableItems.length - 1 &&
          SAPcurrentAreaId !== GLOBALCONST.EPOCH_AREA_ID
        ) {
          setInventoryPaneSlotIdx(
            inventoryPaneFromSlotIdx + GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
            inventoryPaneToSlotIdx + GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET
          );
        }
        break;
      default:
    }
  }

  /* *******************************************************************************************
   * Path: Main -> InventoryPane
   * through render function
   *
   * Will be called by "interceptInventoryPaneClickHandler" function in InventoryPane.
   * ********************************************************************************************
   */
  inventoryItemClickHandler(clickedItem, slotIdx) {
    const {
      SAPplayerEquipment,
      DAPsetVitalStat,
      DAPremoveInventoryItem,
      DAPequip,
      showBattlePane,
      battlePaneUseItemBtnWasClicked,
      battlePaneUseItemBtnClickEventHandler
    } = this.props;

    switch (clickedItem.id.substring(0, 1)) {
      case 'I':
        switch (clickedItem.id) {
          case 'I-1':
            DAPsetVitalStat(GLOBALCONST.VITAL_STAT_HP, clickedItem.point[0]);
            DAPremoveInventoryItem(slotIdx, GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM);
            break;
          case 'I-2':
            DAPsetVitalStat(GLOBALCONST.VITAL_STAT_MP, clickedItem.point[0]);
            DAPremoveInventoryItem(slotIdx, GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM);
            break;
          case 'I-3':
            DAPsetVitalStat(GLOBALCONST.VITAL_STAT_ST, clickedItem.point[0]);
            DAPremoveInventoryItem(slotIdx, GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM);
            break;
          default:
        }
        break;
      case 'W':
        if (isEqual(SAPplayerEquipment.sword, GLOBALCONST.INVENTORY_EMPTY_SLOT)) {
          DAPequip(
            GLOBALCONST.EQUIPMENT_TYPE_SWORD,
            GLOBALCONST.EQUIP_ACTION_DEFAULT,
            clickedItem,
            slotIdx
          );
          DAPremoveInventoryItem(slotIdx, GLOBALCONST.ITEM_TYPE_EQUIPMENT);
        } else {
          DAPequip(
            GLOBALCONST.EQUIPMENT_TYPE_SWORD,
            GLOBALCONST.EQUIP_ACTION_SWAP,
            clickedItem,
            slotIdx
          );
        }
        break;
      case 'S':
        if (isEqual(SAPplayerEquipment.shield, GLOBALCONST.INVENTORY_EMPTY_SLOT)) {
          DAPequip(
            GLOBALCONST.EQUIPMENT_TYPE_SHIELD,
            GLOBALCONST.EQUIP_ACTION_DEFAULT,
            clickedItem,
            slotIdx
          );
          DAPremoveInventoryItem(slotIdx, GLOBALCONST.ITEM_TYPE_EQUIPMENT);
        } else {
          DAPequip(
            GLOBALCONST.EQUIPMENT_TYPE_SHIELD,
            GLOBALCONST.EQUIP_ACTION_SWAP,
            clickedItem,
            slotIdx
          );
        }
        break;
      case 'A':
        if (isEqual(SAPplayerEquipment.armour, GLOBALCONST.INVENTORY_EMPTY_SLOT)) {
          DAPequip(
            GLOBALCONST.EQUIPMENT_TYPE_ARMOUR,
            GLOBALCONST.EQUIP_ACTION_DEFAULT,
            clickedItem,
            slotIdx
          );
          DAPremoveInventoryItem(slotIdx, GLOBALCONST.ITEM_TYPE_EQUIPMENT);
        } else {
          DAPequip(
            GLOBALCONST.EQUIPMENT_TYPE_ARMOUR,
            GLOBALCONST.EQUIP_ACTION_SWAP,
            clickedItem,
            slotIdx
          );
        }
        break;
      default:
    }

    if (showBattlePane && battlePaneUseItemBtnWasClicked) {
      battlePaneUseItemBtnClickEventHandler('reset');
    } else {
      // throw an exception. In this function, the battlePaneUseItemBtnWasClicked state must not be false
      // if the showBattlePane state is true.
    }
  }

  /* *******************************************************************************************
   * Path: Main -> CentrePane -> BattlePane
   * To be called by interceptBattlePaneEventHandler in BattlePane
   * Running away from a battle incurs penalty.
   * *******************************************************************************************
   */
  battlePaneRunBtnClickHandler() {
    const { setShowModalWindowStates, SAPvitalStat, SAPmoney } = this.props;

    // determine the penalty of running away from battle
    let payload = {};
    if (SAPmoney >= 5) {
      // player will lose 1/5th of his accumulated money
      payload = {
        penaltyType: GLOBALCONST.ITEM_TYPE_COINS,
        penaltyWeight: Math.floor((1 / 5) * SAPmoney)
      };
    } else {
      // player will lose 1/5th of his HP/MP/ST, whichever has the highest value
      const vitalStats = {
        HP: SAPvitalStat.remainingHP,
        MP: SAPvitalStat.remainingMP,
        ST: SAPvitalStat.remainingST
      };

      const getMax = objects => {
        return Object.keys(objects).filter(x => {
          return objects[x] === Math.max.apply(null, Object.values(objects));
        });
      };

      const maxPointKeys = getMax(vitalStats);

      payload = {
        penaltyType: maxPointKeys[0],
        penaltyWeight: Math.floor((1 / 5) * vitalStats[maxPointKeys[0]])
      };
    }

    const warningMsg = (
      <div className="modalContentContainer">
        <div className="modalContent">
          <h3>Confirm running away from battle?</h3>
          <div>You will lose</div>
          <div>
            <span>{[payload.penaltyType, ': '].join('')}</span>
            <span>{payload.penaltyWeight}</span>
          </div>
        </div>
      </div>
    );

    // 3. & 4. are implemented in modalWindowBtnClickHandler func in App component.
    setShowModalWindowStates(
      GLOBALCONST.MODAL_WINDOW.CONFIRMATION,
      GLOBALCONST.MODAL_WINDOW_CONTEXT.RUN_FROM_BATTLE,
      warningMsg,
      'Run',
      'Stay',
      payload
    );
  }

  /* *******************************************************************************************
   * Path: Main -> CentrePane -> BattlePane
   *
   * This function will be called by BattlePaneAttackBtnClickEventHandler function in BattlePane
   * for the following reasons:
   * 1. to notify CentrePane through "showBattlePaneEventHandler" function to
   *    unmount BattlePane & render BoardPane
   * 2. to notify the board game to change the tile state to 'explored' by calling the
   *   "DAPmarkATileAsExplored" to update the redux state.
   * 3. to update the inventory with the gained loot (if any)
   * 4. to update the hero's exp
   * 5. if game over, restart the game by calling DAPgetNextArea.
   *
   * Note: Step 3 & 4 are implemented in modalWindowBtnClickHandler func in App component.
   * ********************************************************************************************
   */
  battlePaneBattleOverEventHandler(battlePaneInfo) {
    const {
      DAPmarkATileAsExplored,
      SAPvitalStat,
      SAPareaInfo,
      setShowModalWindowStates,
      showBattlePaneEventHandler
    } = this.props;

    // 1.
    showBattlePaneEventHandler(false);

    if (SAPvitalStat.remainingHP > 0) {
      // determine the obtained loot
      const { lootOptions, gainedExp } = battlePaneInfo;
      const optionIdx = Math.floor(Math.random() * lootOptions.length);
      const gainedExpIdx = Math.floor(Math.random() * gainedExp.length);
      let payload = {};

      switch (lootOptions[optionIdx].substring(0, 1)) {
        case 'I':
          SAPareaInfo.areaItems.forEach(anItemInfo => {
            if (anItemInfo.id === lootOptions[optionIdx]) {
              payload = {
                gainedExp: gainedExp[gainedExpIdx],
                lootedItemType: GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM,
                lootedItem: anItemInfo,
                imgRefs: [this.lootedItemImg]
              };
            }
          });
          break;
        case 'A':
        case 'W':
        case 'S':
          SAPareaInfo.areaEquipments.forEach(anItemInfo => {
            if (anItemInfo.id === lootOptions[optionIdx]) {
              payload = {
                gainedExp: gainedExp[gainedExpIdx],
                lootedItemType: GLOBALCONST.ITEM_TYPE_EQUIPMENT,
                lootedItem: anItemInfo,
                imgRefs: [this.lootedItemImg]
              };
            }
          });
          break;
        default:
      }

      const victoryMsg = (
        <div className="modalContentContainer">
          <div className="modalContent">
            <h3>You won the Battle!</h3>
            <div>{['You gained', gainedExp[gainedExpIdx], 'exp.'].join(' ')}</div>
            <div>You obtained:</div>
            <div className="modalImg">
              <ImageMarkup
                reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                alt={payload.lootedItem.name}
                classes=""
                src=""
                dataSrc={require(`../svg/${payload.lootedItem.img}`)}
                dataSrcSet={require(`../svg/${payload.lootedItem.img}`)}
                observeInDidUpdate={false}
              />
            </div>
            <div>{payload.lootedItem.name}</div>
          </div>
        </div>
      );

      // 3. & 4. are implemented in modalWindowBtnClickHandler func in App component.
      setShowModalWindowStates(
        GLOBALCONST.MODAL_WINDOW.CONFIRMATION,
        GLOBALCONST.MODAL_WINDOW_CONTEXT.WON_BATTLE,
        victoryMsg,
        'Get Item',
        'Leave Item',
        payload
      );
    } else {
      const gameOverMsg = (
        <div className="modalContentContainer">
          <div className="modalContent">
            <h1>GAME OVER</h1>
          </div>
        </div>
      );

      // 5. DAPgetNextArea is called in modalWindowBtnClickHandler func in App component.
      setShowModalWindowStates(
        GLOBALCONST.MODAL_WINDOW.NOTIFICATION,
        GLOBALCONST.MODAL_WINDOW_CONTEXT.GAME_OVER,
        gameOverMsg,
        'Restart Game'
      );
    }

    // 2.
    DAPmarkATileAsExplored(battlePaneInfo.tileIdx);
  }

  /* *******************************************************************************************
   * Will be called by "render" function.
   * ********************************************************************************************
   */
  renderStartBtnPane() {
    const { setShowModalWindowStates, SAPcurrentAreaId } = this.props;

    return (
      <StartButton
        SAPcurrentAreaId={SAPcurrentAreaId}
        onClickHandler={this.startBtnClickEventHandler}
        setShowModalWindowStates={setShowModalWindowStates}
      />
    );
  }

  /* *******************************************************************************************
   * Will be called by "render" function.
   * ********************************************************************************************
   */
  renderCentrePane() {
    const {
      showEquipmentPane,
      showCharUpgradePane,
      showShopPane,
      showBattlePane,
      battlePaneConfirmEscapeBattle,
      battlePaneUseItemBtnWasClicked,
      setBattlePaneConfirmEscapeBattle,
      heroBtnClickEventHandler,
      showBattlePaneEventHandler,
      battlePaneEnemyTurnAfterUsingItem,
      battlePaneUseItemBtnClickEventHandler,
      setBattlePaneEnemyTurnAfterUsingItemToFalse,
      setShowModalWindowStates
    } = this.props;

    const localProps = {
      showEquipmentPane,
      showCharUpgradePane,
      showShopPane,
      showBattlePane,
      battlePaneUseItemBtnWasClicked,
      battlePaneEnemyTurnAfterUsingItem,
      battlePaneConfirmEscapeBattle,
      heroBtnClickHandler: heroBtnClickEventHandler,
      showBattlePaneEventHandler,
      setBattlePaneEnemyTurnAfterUsingItemToFalse,
      setBattlePaneConfirmEscapeBattle,
      setShowModalWindowStates,
      battlePaneUseItemBtnClickEventHandler,
      battlePaneRunBtnClickHandler: this.battlePaneRunBtnClickHandler,
      battlePaneBattleOverEventHandler: this.battlePaneBattleOverEventHandler
    };

    return <CentrePane {...localProps} />;
  }

  render() {
    let conditionalRendering;
    const {
      SAPcurrentAreaId,
      SAPvitalStat,
      SAPplayerEquipment,
      SAPplayerCurrentExp,
      SAPplayerTargetExp,
      SAPconsumableItems,
      SAPequipmentItems,
      showEquipmentPane,
      inventoryPaneFromSlotIdx,
      inventoryPaneToSlotIdx,
      showBattlePane,
      battlePaneUseItemBtnWasClicked
    } = this.props;

    if (SAPcurrentAreaId === GLOBALCONST.EPOCH_AREA_ID) {
      conditionalRendering = this.renderStartBtnPane();
    } else if (SAPcurrentAreaId === GLOBALCONST.AREA_NOT_FOUND_ID) {
      // TODO : Save player progress to DB
      conditionalRendering = this.renderStartBtnPane();
    } else {
      conditionalRendering = this.renderCentrePane();
    }

    return (
      <main role="main">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2">
              <VitalStat SAPvitalStat={SAPvitalStat} SAPplayerEquipment={SAPplayerEquipment} />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-xl-2 order-lg-2 order-md-1 order-sm-1 order-1">
              <LevelProgress
                SAPplayerCurrentExp={SAPplayerCurrentExp}
                SAPplayerTargetExp={SAPplayerTargetExp}
                SAPcurrentAreaId={SAPcurrentAreaId}
              />
              {conditionalRendering}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 no-gutters order-xl-3 order-lg-3 order-md-3 order-sm-3 order-3">
              <InventoryPane
                SAPconsumableItems={SAPconsumableItems}
                SAPequipmentItems={SAPequipmentItems}
                showEquipmentPaneState={showEquipmentPane}
                inventoryShiftBtnHandler={this.inventoryShiftBtnHandler}
                inventoryItemClickHandler={this.inventoryItemClickHandler}
                fromSlotIdx={inventoryPaneFromSlotIdx}
                toSlotIdx={inventoryPaneToSlotIdx}
                showBattlePane={showBattlePane}
                battlePaneUseItemBtnWasClicked={battlePaneUseItemBtnWasClicked}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  DAPgainExp: PropTypes.func.isRequired,
  DAPexpandInventory: PropTypes.func.isRequired,
  DAPgetNextArea: PropTypes.func.isRequired,
  DAPmarkATileAsExplored: PropTypes.func.isRequired,
  DAPsetVitalStat: PropTypes.func.isRequired,
  DAPremoveInventoryItem: PropTypes.func.isRequired,
  DAPequip: PropTypes.func.isRequired,
  SAPcurrentAreaId: PropTypes.string.isRequired,
  SAPnextAreaId: PropTypes.string.isRequired,
  SAPvitalStat: PropTypes.shape(GLOBALCONST.SAP_VITAL_STAT).isRequired,
  SAPplayerCurrentExp: PropTypes.number.isRequired,
  SAPplayerTargetExp: PropTypes.number.isRequired,
  SAPplayerEquipment: PropTypes.shape(
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired
  ).isRequired,
  SAPequipmentItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired).isRequired,
  SAPconsumableItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired)
    .isRequired,
  SAPareaInfo: PropTypes.shape({
    currentAreaId: PropTypes.string.isRequired,
    nextAreaId: PropTypes.string.isRequired,
    areaMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired)
      .isRequired,
    areaEnemies: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ENEMY)),
    areaItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)),
    areaEquipments: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)),
    areaDoors: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_DOOR))
  }).isRequired,
  SAPmoney: PropTypes.number.isRequired,
  showEquipmentPane: PropTypes.bool.isRequired,
  inventoryPaneFromSlotIdx: PropTypes.number.isRequired,
  inventoryPaneToSlotIdx: PropTypes.number.isRequired,
  showBattlePane: PropTypes.bool.isRequired,
  showCharUpgradePane: PropTypes.bool.isRequired,
  showShopPane: PropTypes.bool.isRequired,
  battlePaneEnemyTurnAfterUsingItem: PropTypes.bool.isRequired,
  battlePaneUseItemBtnWasClicked: PropTypes.bool.isRequired,
  battlePaneConfirmEscapeBattle: PropTypes.bool.isRequired,
  heroBtnClickEventHandler: PropTypes.func.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired,
  showBattlePaneEventHandler: PropTypes.func.isRequired,
  setInventoryPaneSlotIdx: PropTypes.func.isRequired,
  battlePaneUseItemBtnClickEventHandler: PropTypes.func.isRequired,
  setBattlePaneEnemyTurnAfterUsingItemToFalse: PropTypes.func.isRequired,
  setBattlePaneConfirmEscapeBattle: PropTypes.func.isRequired
};

// DAP -> Dispatch (action creator function) As Prop
function mapDispatchToProps(dispatch) {
  return {
    DAPgetNextArea: nextAreaId => dispatch(getNextArea(nextAreaId)),
    DAPsetVitalStat: (type, point) => dispatch(setVitalStat(type, point)),
    DAPremoveInventoryItem: (slotIdx, itemType) => dispatch(removeInventoryItem(slotIdx, itemType)),
    DAPequip: (type, equipAction, clickedItem, slotIdx) =>
      dispatch(equip(type, equipAction, clickedItem, slotIdx)),
    DAPmarkATileAsExplored: tileIdx => dispatch(markATileAsExplored(tileIdx)),
    DAPexpandInventory: () => dispatch(expandInventory()),
    DAPgainExp: point => dispatch(gainExp(point))
  };
}

// SAP -> (Redux) State As Prop
// alternatively, use getState method in the action creator function.
function mapStateToProps(state) {
  return {
    SAPareaInfo: state.generalReducer.areaInfo,
    SAPcurrentAreaId: state.generalReducer.areaInfo.currentAreaId,
    SAPnextAreaId: state.generalReducer.areaInfo.nextAreaId,
    SAPvitalStat: state.generalReducer.playerVitalStat,
    SAPplayerEquipment: state.generalReducer.playerEquipment,
    SAPplayerCurrentExp: state.generalReducer.playerProgress.currentExp,
    SAPplayerTargetExp: state.generalReducer.playerProgress.tgtExp,
    SAPconsumableItems: state.generalReducer.playerInventory.consumableItems,
    SAPequipmentItems: state.generalReducer.playerInventory.equipments,
    SAPmoney: state.generalReducer.money
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
