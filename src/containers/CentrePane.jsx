import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Equipment from '../components/Equipment';
import BoardGame from './BoardGame';
import CharUpgrade from '../components/CharUpgrade';
import BattlePane from '../components/BattlePane';
import ShopPane from '../components/ShopPane';

import { setAttributePoint, setVitalStat } from '../actions';

import { GLOBALCONST } from '../AppContext';

// NOTE : Its okay if the parent component happens to be not a presentational component.
// Check the ** footnote from this article (written by Redux creator himself) :
// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
class CentrePane extends Component {
  static renderShopPane() {
    return <ShopPane />;
  }

  constructor(props) {
    super(props);

    /* *******************************************************************************************
     *  battlePaneInfo
     *  ==============
     *  path : CentrePane -> BoardGame -> BoardCell
     *  path : CentrePane -> BattlePane
     *
     *  This state is used by boardGame component to pass the info of the clicked enemy
     *  to BattlePane component.
     *  This state is defined for the 1st time in "setShowBattlePaneStates" which will be called
     *  in "revealedTileClickAction" function in BoardCell.
     *
     *  battleSession
     *  =============
     *  path: CentrePane -> BattlePane
     *
     *  The turn based nature of the battle mechanic requires component re-render of the BattlePane
     *  component. This state is used to keep track of the enemy during battle session.
     * *******************************************************************************************
     */
    this.state = {
      battlePaneInfo: GLOBALCONST.BATTLE_PANE_INFO,
      battleSession: {
        enemyTurn: false,
        enemyHP: 0,
        battleTurnNumber: 1
      }
    };

    this.setShowBattlePaneStates = this.setShowBattlePaneStates.bind(this);
    this.battleSessionUpdateStates = this.battleSessionUpdateStates.bind(this);
    this.charUpgradeOkButtonClickHandler = this.charUpgradeOkButtonClickHandler.bind(this);
  }

  componentDidUpdate() {
    const { battlePaneConfirmEscapeBattle, setBattlePaneConfirmEscapeBattle } = this.props;

    if (battlePaneConfirmEscapeBattle) {
      setBattlePaneConfirmEscapeBattle(false);
      this.setShowBattlePaneStates(false);
    }
  }

  setShowBattlePaneStates(showIt, battlePaneInfo = GLOBALCONST.BATTLE_PANE_INFO) {
    const { showBattlePaneEventHandler } = this.props;

    // don't forget to reset enemyTurn, enemuyHP, & battleTurnNumber state. This is particularly
    // important after players winning from a battle or running away from a battle.
    this.setState({
      battlePaneInfo,
      battleSession: {
        enemyTurn: false,
        enemyHP: 0,
        battleTurnNumber: 1
      }
    });
    showBattlePaneEventHandler(showIt);
  }

  battleSessionUpdateStates(enemyTurn = false, enemyHP = 0, battleTurnNumber = 1) {
    this.setState({
      battleSession: {
        enemyTurn,
        enemyHP,
        battleTurnNumber
      }
    });
  }

  charUpgradeOkButtonClickHandler(updatedAttributes) {
    const { DAPsetAttributePoint, showCharUpgradePane, heroBtnClickHandler } = this.props;

    DAPsetAttributePoint(GLOBALCONST.PLAYER_ATTRIBUTE_ATK, updatedAttributes.baseAtkAttr);
    DAPsetAttributePoint(GLOBALCONST.PLAYER_ATTRIBUTE_DEF, updatedAttributes.baseDefAttr);
    DAPsetAttributePoint(GLOBALCONST.PLAYER_ATTRIBUTE_HP, updatedAttributes.maxBaseHpAttr);
    DAPsetAttributePoint(GLOBALCONST.PLAYER_ATTRIBUTE_MP, updatedAttributes.maxBaseMpAttr);
    DAPsetAttributePoint(GLOBALCONST.PLAYER_ATTRIBUTE_ST, updatedAttributes.maxBaseStAttr);
    // DEV NOTE :
    // Attr point is stored in redux state hence it can be saved into the Database.
    // The use case scenario would be if a player decided not to spent all of the available
    // points before getting to the next level.
    DAPsetAttributePoint(GLOBALCONST.PLAYER_ATTRIBUTE_LVLUP_PT, updatedAttributes.availablePoint);

    if (showCharUpgradePane) {
      heroBtnClickHandler();
    }
  }

  renderEquipmentPane() {
    const { SAPplayerEquipment } = this.props;

    return <Equipment SAPplayerEquipment={SAPplayerEquipment} />;
  }

  renderBattlePane() {
    const {
      battlePaneUseItemBtnClickEventHandler,
      battlePaneBattleOverEventHandler,
      battlePaneUseItemBtnWasClicked,
      battlePaneEnemyTurnAfterUsingItem,
      setBattlePaneEnemyTurnAfterUsingItemToFalse,
      battlePaneRunBtnClickHandler,
      DAPsetVitalStat,
      SAPplayerVitalStat,
      SAPplayerEquipment,
      SAPplayerAtkAttr,
      SAPplayerDefAttr
    } = this.props;
    const { battlePaneInfo, battleSession } = this.state;
    /* prettier-ignore */
    const localProps = { SAPplayerVitalStat, SAPplayerEquipment, SAPplayerAtkAttr, SAPplayerDefAttr,
                         DAPsetVitalStat, battlePaneInfo, battleSession,
                         battlePaneBattleOverEventHandler, battlePaneRunBtnClickHandler,
                         battlePaneUseItemBtnWasClicked, battlePaneUseItemBtnClickEventHandler,
                         battlePaneEnemyTurnAfterUsingItem, setBattlePaneEnemyTurnAfterUsingItemToFalse,
                         battleSessionUpdateStates: this.battleSessionUpdateStates,
                         setShowBattlePaneStates: this.setShowBattlePaneStates
    };

    return <BattlePane {...localProps} />;
  }

  renderBoardGamePane() {
    const { SAPareaInfo, setShowModalWindowStates } = this.props;

    return (
      <BoardGame
        setShowBattlePaneStates={this.setShowBattlePaneStates}
        setShowModalWindowStates={setShowModalWindowStates}
        SAPareaInfo={SAPareaInfo}
      />
    );
  }

  renderCharUpgradePane() {
    /* prettier-ignore */
    const { SAPplayerAtkAttr, SAPplayerDefAttr, SAPavailableAttrPt,
            SAPplayerEquipment, SAPplayerVitalStat } = this.props;
    /* prettier-ignore */
    const localProps = { SAPplayerAtkAttr, SAPplayerDefAttr,
                         SAPavailableAttrPt, SAPplayerVitalStat,
                         SAPplayerEquipment,
                         availablePoint: SAPavailableAttrPt,
                         charUpgradeOkButtonClickHandler: this.charUpgradeOkButtonClickHandler
    };

    return <CharUpgrade {...localProps} />;
  }

  render() {
    let conditionalRendering;
    const {
      showEquipmentPane,
      showCharUpgradePane,
      showShopPane,
      showBattlePane,
      battlePaneConfirmEscapeBattle
    } = this.props;

    if (showCharUpgradePane) {
      conditionalRendering = this.renderCharUpgradePane();
    } else if (showEquipmentPane) {
      conditionalRendering = this.renderEquipmentPane();
    } else if (showShopPane) {
      conditionalRendering = CentrePane.renderShopPane();
    } else if (showBattlePane && !battlePaneConfirmEscapeBattle) {
      conditionalRendering = this.renderBattlePane();
    } else {
      conditionalRendering = this.renderBoardGamePane();
    }

    return <React.Fragment>{conditionalRendering}</React.Fragment>;
  }
}

CentrePane.propTypes = {
  showEquipmentPane: PropTypes.bool.isRequired,
  showBattlePaneEventHandler: PropTypes.func.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired,
  battlePaneConfirmEscapeBattle: PropTypes.bool.isRequired,
  battlePaneUseItemBtnWasClicked: PropTypes.bool.isRequired,
  battlePaneEnemyTurnAfterUsingItem: PropTypes.bool.isRequired,
  battlePaneUseItemBtnClickEventHandler: PropTypes.func.isRequired,
  battlePaneRunBtnClickHandler: PropTypes.func.isRequired,
  setBattlePaneEnemyTurnAfterUsingItemToFalse: PropTypes.func.isRequired,
  setBattlePaneConfirmEscapeBattle: PropTypes.func.isRequired,
  battlePaneBattleOverEventHandler: PropTypes.func.isRequired,
  showCharUpgradePane: PropTypes.bool.isRequired,
  showShopPane: PropTypes.bool.isRequired,
  showBattlePane: PropTypes.bool.isRequired,
  heroBtnClickHandler: PropTypes.func.isRequired,
  DAPsetAttributePoint: PropTypes.func.isRequired,
  DAPsetVitalStat: PropTypes.func.isRequired,
  SAPplayerEquipment: PropTypes.shape(
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired
  ).isRequired,
  SAPplayerVitalStat: PropTypes.shape(GLOBALCONST.SAP_VITAL_STAT).isRequired,
  SAPavailableAttrPt: PropTypes.number.isRequired,
  SAPplayerAtkAttr: PropTypes.number.isRequired,
  SAPplayerDefAttr: PropTypes.number.isRequired,
  SAPareaInfo: PropTypes.shape({
    currentAreaId: PropTypes.string.isRequired,
    nextAreaId: PropTypes.string.isRequired,
    areaMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired)
      .isRequired,
    areaEnemies: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ENEMY)),
    areaItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)),
    areaEquipments: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)),
    areaDoors: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_DOOR))
  }).isRequired
};

// DAP -> Dispatch (action creator function) As Prop
function mapDispatchToProps(dispatch) {
  return {
    DAPsetVitalStat: (type, point) => dispatch(setVitalStat(type, point)),
    DAPsetAttributePoint: (type, point) => dispatch(setAttributePoint(type, point))
  };
}

// SAP -> (Redux) State As Prop
function mapStateToProps(state) {
  return {
    SAPareaInfo: state.generalReducer.areaInfo,
    SAPplayerVitalStat: state.generalReducer.playerVitalStat,
    SAPplayerEquipment: state.generalReducer.playerEquipment,
    SAPplayerAtkAttr: state.generalReducer.playerProgress.baseAtk,
    SAPplayerDefAttr: state.generalReducer.playerProgress.baseDef,
    SAPavailableAttrPt: state.generalReducer.playerProgress.availableAttrPt
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CentrePane);
