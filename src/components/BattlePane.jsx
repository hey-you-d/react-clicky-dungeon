import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageMarkup from './ImageMarkup';

import { GLOBALCONST } from '../AppContext';

import skull from '../svg/si-glyph-skull.svg';

const LOCALCONST = {
  ISCHROME: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  ISSAFARI: /Safari/.test(navigator.userAgent) && /AppleComputer/.test(navigator.vendor)
};

export default class BattlePane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerStatus: {
        totalAtk: 0,
        totalDef: 0
      }
    };

    this.enemyAvatar = React.createRef();
  }

  componentDidMount() {
    const {
      SAPplayerAtkAttr,
      SAPplayerDefAttr,
      SAPplayerEquipment,
      battleSession,
      battlePaneInfo,
      battleSessionUpdateStates
    } = this.props;

    this.setState({
      playerStatus: {
        totalAtk:
          Object.entries(SAPplayerEquipment.sword).length > 0
            ? SAPplayerAtkAttr + SAPplayerEquipment.sword.point[0]
            : SAPplayerAtkAttr,
        totalDef:
          Object.entries(SAPplayerEquipment.shield).length > 0
            ? SAPplayerDefAttr + SAPplayerEquipment.shield.point[0]
            : SAPplayerDefAttr
      }
    });

    if (battleSession.battleTurnNumber === 1) {
      // the start of a battle, run the showing up animation
      this.runAnimation('showingUpAnimation 0.5s 1 normal');
      // remove the animation listener used for the showing up animation
      this.removeAnimationEventListener();
      setTimeout(() => {
        if (this.enemyAvatar.current.hasAttribute('style')) {
          this.enemyAvatar.current.removeAttribute('style');
        }
      }, 500);
    }

    if (battleSession.enemyHP === 0) {
      battleSessionUpdateStates(
        battleSession.enemyTurn,
        battlePaneInfo.HP,
        battleSession.battleTurnNumber
      );
    }
  }

  componentWillReceiveProps() {
    const {
      battlePaneEnemyTurnAfterUsingItem,
      setBattlePaneEnemyTurnAfterUsingItemToFalse
    } = this.props;

    if (battlePaneEnemyTurnAfterUsingItem) {
      setBattlePaneEnemyTurnAfterUsingItemToFalse();
      this.enemyTurn('playerAtk');
    }
  }

  componentWillUnmount() {
    // remove the animation listener used for the fading animation
    this.removeAnimationEventListener();
  }

  battlePaneAttackBtnClickEventHandler() {
    const {
      battlePaneBattleOverEventHandler,
      battleSession,
      battlePaneInfo,
      battleSessionUpdateStates
    } = this.props;
    const { playerStatus } = this.state;

    // for demo purpose, the hero will always land a successful attack (100% hit rate).
    if (battleSession.enemyHP - playerStatus.totalAtk > 0) {
      // The enemy is taking damage.
      this.runAnimation('shakingAnimation 0.5s 1 normal');
      // remove the animation listener used for the attack animation
      this.removeAnimationEventListener();
      setTimeout(() => {
        if (this.enemyAvatar.current.hasAttribute('style')) {
          this.enemyAvatar.current.removeAttribute('style');
        }

        battleSessionUpdateStates(
          true,
          battleSession.enemyHP - playerStatus.totalAtk < 0
            ? 0
            : battleSession.enemyHP - playerStatus.totalAtk,
          battleSession.battleTurnNumber
        );
        this.enemyTurn('playerAtk');
      }, 500);
    } else {
      // the enemy has been defeated.
      this.runAnimation('fadingAnimation 1s normal');
      setTimeout(() => {
        battlePaneBattleOverEventHandler(battlePaneInfo);
      }, 1000);
    }
  }

  battlePaneGuardBtnClickEventHandler() {
    this.enemyTurn('playerDef');
  }

  enemyTurn(playerMode) {
    const { battlePaneInfo, battleSession, battleSessionUpdateStates } = this.props;
    const { attackRange } = battlePaneInfo;

    if (battleSession.enemyHP > 0) {
      if (attackRange.length === 2) {
        this.runAnimation('attackAnimation 0.7s 1 normal');
        this.afterEnemyAttackAnimation(playerMode);
      } else {
        // throw error here
      }
    } else {
      battleSessionUpdateStates(false, 0, 1);
    }
  }

  afterEnemyAttackAnimation(playerMode) {
    const {
      SAPplayerVitalStat,
      DAPsetVitalStat,
      battlePaneInfo,
      battleSession,
      battleSessionUpdateStates,
      battlePaneBattleOverEventHandler
    } = this.props;
    const { playerStatus } = this.state;
    const { attackRange } = battlePaneInfo;

    setTimeout(() => {
      if (this.enemyAvatar.current.hasAttribute('style')) {
        this.enemyAvatar.current.removeAttribute('style');
      }

      // for demo purpose, always resolve to 100% hit
      const atkPoint = Math.floor(Math.random() * attackRange[1]) + attackRange[0];
      let inflictedDmg = 0;

      switch (playerMode) {
        case 'playerAtk':
          inflictedDmg = atkPoint - playerStatus.totalDef;

          break;
        case 'playerDef':
          inflictedDmg = atkPoint - playerStatus.totalDef * 2;

          break;
        default:
      }

      inflictedDmg = inflictedDmg < 0 ? 1 : inflictedDmg;
      battleSessionUpdateStates(false, battleSession.enemyHP, battleSession.battleTurnNumber + 1);
      DAPsetVitalStat(GLOBALCONST.VITAL_STAT_HP, inflictedDmg * -1);

      // the "Game Over" check will also be performed in redux reducer because
      // it WILL be possible for the hero to lose HP outside battle
      // (poison, traps, etc...).
      if (inflictedDmg >= SAPplayerVitalStat.remainingHP) {
        battleSessionUpdateStates(false, 0, 1);
        battlePaneBattleOverEventHandler(battlePaneInfo);
      }
    }, 700);
  }

  runAnimation(animStyles) {
    if (LOCALCONST.ISCHROME || LOCALCONST.ISSAFARI) {
      this.enemyAvatar.current.style.webkitAnimation = animStyles;
      this.enemyAvatar.current.addEventListener('webkitAnimationEnd', () => {});
    } else {
      this.enemyAvatar.current.style.animation = animStyles;
      this.enemyAvatar.current.addEventListener('animationEnd', () => {});
    }
  }

  removeAnimationEventListener() {
    if (LOCALCONST.ISCHROME || LOCALCONST.ISSAFARI) {
      this.enemyAvatar.current.removeEventListener('webkitAnimationEnd', () => {});
    } else {
      this.enemyAvatar.current.removeEventListener('animationEnd', () => {});
    }
  }

  render() {
    const {
      battlePaneInfo,
      battleSession,
      battlePaneUseItemBtnWasClicked,
      battlePaneUseItemBtnClickEventHandler,
      battlePaneRunBtnClickHandler
    } = this.props;

    let battleMsg = '[ Your Turn ]';
    if (battleSession.enemyTurn) {
      battleMsg = '[ Enemy Turn ]';
    } else {
      battleMsg = battlePaneUseItemBtnWasClicked ? '[ Select an item ]' : '[ Your Turn ]';
    }

    return (
      <div className="container ingame-battle-container">
        <div className="row no-gutters">
          <div className="col-2">
            <div>Turn</div>
            <div>{battleSession.battleTurnNumber}</div>
          </div>
          <div className="col-8">
            <div>
              <ImageMarkup
                reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                alt="Dangerous Enemy"
                classes=""
                src=""
                dataSrc={skull}
                dataSrcSet={skull}
                observeInDidUpdate={false}
              />
              <span> Lv. </span>
              <span>{battlePaneInfo.level}</span>
            </div>
            <div>
              <span>-</span>
              <span>{battlePaneInfo.name}</span>
              <span>-</span>
            </div>
          </div>
          <div className="col-2">
            <div>HP</div>
            <div>{battleSession.enemyHP}</div>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-2" />
          <div className="col-8">
            <ImageMarkup
              reference={this.enemyAvatar}
              alt="enemy avatar"
              classes=""
              src=""
              dataSrc={require(`../svg/${battlePaneInfo.img}`)}
              dataSrcSet={require(`../svg/${battlePaneInfo.img}`)}
              observeInDidUpdate={false}
            />
          </div>
          <div className="col-2" />
        </div>
        <div className="row no-gutters">
          <div className="col-12">{battleMsg}</div>
        </div>
        <div className="row no-gutters">
          <div className="col-3">
            {battleSession.enemyTurn || battlePaneUseItemBtnWasClicked ? (
              <div className="ingame-battle-container-btn-disabled">-ATK-</div>
            ) : (
              <div
                role="button"
                tabIndex={-1}
                className="ingame-battle-container-btn"
                onClick={() => this.battlePaneAttackBtnClickEventHandler()}
                onKeyPress={() => this.battlePaneAttackBtnClickEventHandler()}
              >
                {'-ATK-'}
              </div>
            )}
          </div>
          <div className="col-3">
            {battleSession.enemyTurn || battlePaneUseItemBtnWasClicked ? (
              <div className="ingame-battle-container-btn-disabled">-GRD-</div>
            ) : (
              <div
                role="button"
                tabIndex={-1}
                className="ingame-battle-container-btn"
                onClick={() => this.battlePaneGuardBtnClickEventHandler()}
                onKeyPress={() => this.battlePaneGuardBtnClickEventHandler()}
              >
                {'-GRD-'}
              </div>
            )}
          </div>
          <div className="col-3">
            {battleSession.enemyTurn ? (
              <div className="ingame-battle-container-btn-disabled">-ITM-</div>
            ) : (
              <div
                role="button"
                tabIndex={-1}
                className="ingame-battle-container-btn"
                onClick={() => battlePaneUseItemBtnClickEventHandler()}
                onKeyPress={() => battlePaneUseItemBtnClickEventHandler()}
              >
                {'-ITM-'}
              </div>
            )}
          </div>
          <div className="col-3">
            {battleSession.enemyTurn || battlePaneUseItemBtnWasClicked ? (
              <div className="ingame-battle-container-btn-disabled">-RUN-</div>
            ) : (
              <div
                role="button"
                tabIndex={-1}
                className="ingame-battle-container-btn"
                onClick={() => battlePaneRunBtnClickHandler()}
                onKeyPress={() => battlePaneRunBtnClickHandler()}
              >
                {'-RUN-'}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

BattlePane.propTypes = {
  DAPsetVitalStat: PropTypes.func.isRequired,
  SAPplayerAtkAttr: PropTypes.number.isRequired,
  SAPplayerDefAttr: PropTypes.number.isRequired,
  SAPplayerEquipment: PropTypes.shape(
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired
  ).isRequired,
  SAPplayerVitalStat: PropTypes.shape(GLOBALCONST.SAP_VITAL_STAT).isRequired,
  battlePaneRunBtnClickHandler: PropTypes.func.isRequired,
  battlePaneUseItemBtnClickEventHandler: PropTypes.func.isRequired,
  setBattlePaneEnemyTurnAfterUsingItemToFalse: PropTypes.func.isRequired,
  battlePaneBattleOverEventHandler: PropTypes.func.isRequired,
  battlePaneInfo: PropTypes.shape(GLOBALCONST.BATTLE_PANE_INFO).isRequired,
  battlePaneUseItemBtnWasClicked: PropTypes.bool.isRequired,
  battlePaneEnemyTurnAfterUsingItem: PropTypes.bool.isRequired,
  battleSession: PropTypes.shape(
    PropTypes.bool.isRequired,
    PropTypes.number.isRequired,
    PropTypes.number.isRequired
  ).isRequired,
  battleSessionUpdateStates: PropTypes.func.isRequired
};
