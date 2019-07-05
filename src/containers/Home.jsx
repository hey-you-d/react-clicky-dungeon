import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import { GLOBALCONST } from '../AppContext';
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEquipmentPane: false,
      showCharUpgradePane: false,
      showShopPane: false,
      showBattlePane: false,
      battlePaneUseItemBtnWasClicked: false,
      battlePaneEnemyTurnAfterUsingItem: false,
      inventoryPaneFromSlotIdx: 0,
      inventoryPaneToSlotIdx: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET - 1
    };

    this.showBattlePaneEventHandler = this.showBattlePaneEventHandler.bind(this);
    this.heroBtnClickEventHandler = this.heroBtnClickEventHandler.bind(this);
    this.equipmentPaneEventHandler = this.equipmentPaneEventHandler.bind(this);
    this.shopPaneEventHandler = this.shopPaneEventHandler.bind(this);
    this.battlePaneUseItemBtnClickEventHandler = this.battlePaneUseItemBtnClickEventHandler.bind(
      this
    );
    this.setBattlePaneEnemyTurnAfterUsingItemToFalse = this.setBattlePaneEnemyTurnAfterUsingItemToFalse.bind(
      this
    );
    this.setInventoryPaneSlotIdx = this.setInventoryPaneSlotIdx.bind(this);
  }

  /* *******************************************************************************************
   * Path : Home -> Main
   * through render function, to be called by inventoryShiftBtnHandler function in Main.
   * *******************************************************************************************
   */
  setInventoryPaneSlotIdx(inventoryPaneFromSlotIdx, inventoryPaneToSlotIdx) {
    this.setState({
      inventoryPaneFromSlotIdx,
      inventoryPaneToSlotIdx
    });
  }

  /* *******************************************************************************************
   * Path : Home -> Main -> CentrePane -> BattlePane
   * through render function, to be called by inventoryShiftBtnHandler function in BattlePane.
   * *******************************************************************************************
   */
  setBattlePaneEnemyTurnAfterUsingItemToFalse() {
    this.setState({
      battlePaneEnemyTurnAfterUsingItem: false
    });
  }

  /* *******************************************************************************************
   *  Path: Home -> Main -> CentrePane
   *  through "render" function.
   *  Will be called by "setShowBattlePaneStates" in CentrePane.
   *
   *  This function is called by "battlePaneBattleOverEventHandler" function in here.
   * *******************************************************************************************
   */
  showBattlePaneEventHandler(showPane) {
    this.setState({
      showShopPane: false,
      showCharUpgradePane: false,
      showEquipmentPane: false,
      showBattlePane: showPane
    });
  }

  /* *******************************************************************************************
   *  Path: Home -> Footer -> Herobtn
   *  through "render" function.
   *
   *  Path: Home -> Main -> CentrePane
   *  through "renderCentrePane" function - to be called by "charUpgradeOkButtonClickHandler"
   *  function in CentrePane.
   * *******************************************************************************************
   */
  heroBtnClickEventHandler() {
    const { SAPcurrentAreaId } = this.props;
    const { showCharUpgradePane, showBattlePane } = this.state;

    // disable the hero, equipment, & shop buttons if showBattlePane
    // state is true
    if (SAPcurrentAreaId !== GLOBALCONST.EPOCH_AREA_ID) {
      this.setState({
        showCharUpgradePane: showBattlePane ? false : !showCharUpgradePane,
        showEquipmentPane: false,
        showShopPane: false,
        showBattlePane
      });
    }
  }

  /* *******************************************************************************************
   *  Path: Home -> Main -> CentrePane -> BattlePane
   *  through "render" function.
   *  Will be called by "renderBattlePane" function in RenderPane.
   * *******************************************************************************************
   */
  battlePaneUseItemBtnClickEventHandler(specialInstruction = 'none') {
    const { battlePaneUseItemBtnWasClicked } = this.state;

    this.setState({
      battlePaneUseItemBtnWasClicked:
        specialInstruction === 'reset' ? false : !battlePaneUseItemBtnWasClicked,
      battlePaneEnemyTurnAfterUsingItem: true
    });
  }

  /* *******************************************************************************************
   *  Path: Home -> Footer -> ShopButton
   *  through "render" function.
   * *******************************************************************************************
   */
  shopPaneEventHandler() {
    const { showShopPane, showBattlePane } = this.state;

    // disable the hero, equipment, & shop buttons if showBattlePane
    // state is true
    this.setState({
      showShopPane: showBattlePane ? false : !showShopPane,
      showCharUpgradePane: false,
      showEquipmentPane: false,
      showBattlePane
    });
  }

  /* *******************************************************************************************
   *  Path: Home -> Footer
   *  through "render" function.
   * *******************************************************************************************
   */
  equipmentPaneEventHandler() {
    const { SAPcurrentAreaId } = this.props;
    const { showEquipmentPane, showBattlePane } = this.state;

    // disable the hero, equipment, & shop buttons if showBattlePane
    // state is true
    if (SAPcurrentAreaId !== GLOBALCONST.EPOCH_AREA_ID) {
      this.setState({
        showEquipmentPane: showBattlePane ? false : !showEquipmentPane,
        showCharUpgradePane: false,
        showShopPane: false,
        showBattlePane,
        // clicking the backpack button will reset the displayed inventory pane slots
        inventoryPaneFromSlotIdx: 0,
        inventoryPaneToSlotIdx: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET - 1
      });
    }
  }

  render() {
    const {
      SAPcurrentAreaId,
      SAPmoney,
      setShowModalWindowStates,
      battlePaneConfirmEscapeBattle,
      setBattlePaneConfirmEscapeBattle
    } = this.props;

    const {
      showEquipmentPane,
      showCharUpgradePane,
      showShopPane,
      inventoryPaneFromSlotIdx,
      inventoryPaneToSlotIdx,
      showBattlePane,
      battlePaneUseItemBtnWasClicked,
      battlePaneEnemyTurnAfterUsingItem
    } = this.state;

    return (
      <div className="App">
        <Header />
        <Main
          showEquipmentPane={showEquipmentPane}
          showCharUpgradePane={showCharUpgradePane}
          showShopPane={showShopPane}
          showBattlePane={showBattlePane}
          inventoryPaneFromSlotIdx={inventoryPaneFromSlotIdx}
          inventoryPaneToSlotIdx={inventoryPaneToSlotIdx}
          battlePaneUseItemBtnWasClicked={battlePaneUseItemBtnWasClicked}
          battlePaneEnemyTurnAfterUsingItem={battlePaneEnemyTurnAfterUsingItem}
          battlePaneConfirmEscapeBattle={battlePaneConfirmEscapeBattle}
          battlePaneUseItemBtnClickEventHandler={this.battlePaneUseItemBtnClickEventHandler}
          setBattlePaneEnemyTurnAfterUsingItemToFalse={
            this.setBattlePaneEnemyTurnAfterUsingItemToFalse
          }
          setBattlePaneConfirmEscapeBattle={setBattlePaneConfirmEscapeBattle}
          heroBtnClickEventHandler={this.heroBtnClickEventHandler}
          setShowModalWindowStates={setShowModalWindowStates}
          showBattlePaneEventHandler={this.showBattlePaneEventHandler}
          setInventoryPaneSlotIdx={this.setInventoryPaneSlotIdx}
        />
        <Footer
          onHeroBtnClickHandler={this.heroBtnClickEventHandler}
          onEquipmentBtnClickHandler={this.equipmentPaneEventHandler}
          onShopBtnClickHandler={this.shopPaneEventHandler}
          setShowModalWindowStates={setShowModalWindowStates}
          SAPcurrentAreaId={SAPcurrentAreaId}
          SAPmoney={SAPmoney}
        />
      </div>
    );
  }
}

Home.propTypes = {
  SAPcurrentAreaId: PropTypes.string.isRequired,
  SAPmoney: PropTypes.number.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired,
  battlePaneConfirmEscapeBattle: PropTypes.bool.isRequired,
  setBattlePaneConfirmEscapeBattle: PropTypes.func.isRequired
};

// SAP -> (Redux) State As Prop
// alternatively, use getState method in the action creator function.
function mapStateToProps(state) {
  return {
    SAPcurrentAreaId: state.generalReducer.areaInfo.currentAreaId,
    SAPnextAreaId: state.generalReducer.areaInfo.nextAreaId,
    SAPmoney: state.generalReducer.money,
    SAPvitalStat: state.generalReducer.playerVitalStat
  };
}

export default connect(mapStateToProps)(Home);
