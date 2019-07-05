import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Tutorial from './Tutorial';
import Portal from '../components/Portal';

import { getNextArea, gainExp, setVitalStat, obtainAnItem, updateCoinPurse } from '../actions';

import { AppContext, GLOBALCONST } from '../AppContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalWindow: {
        type: GLOBALCONST.MODAL_WINDOW.NONE,
        context: GLOBALCONST.MODAL_WINDOW_CONTEXT.NONE,
        message: <div>[message]</div>,
        okLabel: 'OK',
        cancelLabel: 'Cancel',
        payload: {}
      },
      battlePaneConfirmEscapeBattle: false
    };

    this.setShowModalWindowStates = this.setShowModalWindowStates.bind(this);
    this.setBattlePaneConfirmEscapeBattle = this.setBattlePaneConfirmEscapeBattle.bind(this);
  }

  /* *******************************************************************************************
   * Path : App -> Home -> Main
   * through render function, to be called by battlePaneBattleOverEventHandler function in Main.
   *
   * Path : App -> Home -> Main -> CentrePane -> BoardGame
   * to be called by updateTilesModeState to display the gameover notification.
   *
   * Path : App -> Home -> Main -> CentrePane -> BoardGame -> BoardCell
   * to be called by renderTileRevealMode function in BoardCell.
   *
   * Path: App -> Home -> Footer
   * to be called by creditBtnClickHandler function in Footer.
   *
   * This function is also called in this component in the following functions :
   *  ~ modalWindowBtnClickHandler
   *
   * Note:
   * to handle the image lazy loading, declare an 'imgRefs' property inside the 'payload'
   * property. Assign an array of image's React refs in the 'imgRefs' property.
   * The componentDidUpdate method of Portal component will call the
   * HELPER.IMG_LAZY_LOADING_OBSERVER function for each member of the 'imgRefs' array.
   * *******************************************************************************************
   */
  setShowModalWindowStates(
    type = GLOBALCONST.MODAL_WINDOW.NONE,
    context = GLOBALCONST.MODAL_WINDOW_CONTEXT.NONE,
    message = <div>[message]</div>,
    okLabel = 'OK',
    cancelLabel = 'Cancel',
    payload = {}
  ) {
    this.setState({
      showModalWindow: {
        type,
        context,
        message,
        okLabel,
        cancelLabel,
        payload
      }
    });
  }

  /* *******************************************************************************************
   * Path : Home -> Main -> CentrePane
   * through render function, to be called by componentDidUpdate function in CentrePane.
   * *******************************************************************************************
   */
  setBattlePaneConfirmEscapeBattle(confirm) {
    this.setState({
      battlePaneConfirmEscapeBattle: confirm
    });
  }

  /* *******************************************************************************************
   *  This function is called by renderModalWindow function.
   * *******************************************************************************************
   */
  modalWindowBtnClickHandler(e, btnType = 'Cancel') {
    e.preventDefault();

    const { showModalWindow } = this.state;
    const {
      DAPgetNextArea,
      DAPgainExp,
      DAPobtainAnItem,
      DAPupdateCoinPurse,
      SAPnextAreaId,
      DAPsetVitalStat
    } = this.props;

    switch (showModalWindow.context) {
      case GLOBALCONST.MODAL_WINDOW_CONTEXT.WON_BATTLE:
        if (btnType === 'OK') {
          // Get the looted item, update the inventory pane.
          DAPobtainAnItem(
            showModalWindow.payload.lootedItem,
            showModalWindow.payload.lootedItemType
          );
        }

        // if btnType === 'Cancel', Leave the looted item.
        // in both cases, absorb the EXP.
        DAPgainExp(showModalWindow.payload.gainedExp);

        break;
      case GLOBALCONST.MODAL_WINDOW_CONTEXT.RUN_FROM_BATTLE:
        if (btnType === 'OK') {
          this.setState({
            battlePaneConfirmEscapeBattle: true
          });

          switch (showModalWindow.payload.penaltyType) {
            case 'HP':
              DAPsetVitalStat(
                GLOBALCONST.VITAL_STAT_HP,
                showModalWindow.payload.penaltyWeight * -1
              );
              break;
            case 'MP':
              DAPsetVitalStat(
                GLOBALCONST.VITAL_STAT_MP,
                showModalWindow.payload.penaltyWeight * -1
              );
              break;
            case 'ST':
              DAPsetVitalStat(
                GLOBALCONST.VITAL_STAT_ST,
                showModalWindow.payload.penaltyWeight * -1
              );
              break;
            case 'Coins':
              DAPupdateCoinPurse(showModalWindow.payload.penaltyWeight * -1);
              break;
            default:
          }
        } else {
          this.setState({
            battlePaneConfirmEscapeBattle: false
          });
        }

        break;
      case GLOBALCONST.MODAL_WINDOW_CONTEXT.TO_NEXT_AREA:
        if (btnType === 'OK') {
          // jump to the next level
          DAPgetNextArea(SAPnextAreaId);
        }

        break;
      case GLOBALCONST.MODAL_WINDOW_CONTEXT.GAME_OVER:
        // restart the game
        // with GLOBALCONST.GET_NEXTAREA_MODE.RESTART_GAME, all player stats will be reset back to the
        // default value.
        DAPgetNextArea(GLOBALCONST.START_GAME_AREA_ID, GLOBALCONST.GET_NEXTAREA_MODE.RESTART_GAME);

        break;
      default:
    }

    // close the modal window
    this.setShowModalWindowStates();
  }

  /* *******************************************************************************************
   *  This function is called by the Portal component in render function.
   * *******************************************************************************************
   */
  renderModalWindow() {
    const { showModalWindow } = this.state;

    let btnRow = null;
    switch (showModalWindow.type) {
      case GLOBALCONST.MODAL_WINDOW.CONFIRMATION:
        btnRow = (
          <React.Fragment>
            <div className="col-6">
              <div
                role="button"
                tabIndex={-1}
                onClick={e => this.modalWindowBtnClickHandler(e, 'OK')}
                onKeyPress={e => this.modalWindowBtnClickHandler(e, 'OK')}
              >
                {showModalWindow.okLabel}
              </div>
            </div>
            <div className="col-6">
              <div
                role="button"
                tabIndex={-1}
                onClick={e => this.modalWindowBtnClickHandler(e)}
                onKeyPress={e => this.modalWindowBtnClickHandler(e)}
              >
                {showModalWindow.cancelLabel}
              </div>
            </div>
          </React.Fragment>
        );
        break;
      case GLOBALCONST.MODAL_WINDOW.NOTIFICATION:
        btnRow = (
          <div className="col-12">
            <div
              role="button"
              tabIndex={-1}
              onClick={e => this.modalWindowBtnClickHandler(e, 'OK')}
              onKeyPress={e => this.modalWindowBtnClickHandler(e, 'OK')}
            >
              {showModalWindow.okLabel}
            </div>
          </div>
        );
        break;
      default:
    }

    const modalWindowClassName =
      showModalWindow.context === GLOBALCONST.MODAL_WINDOW_CONTEXT.CREDIT
        ? 'modalWindow modalWindowLarge'
        : 'modalWindow modalWindowSmall';

    return showModalWindow.type !== GLOBALCONST.MODAL_WINDOW.NONE ? (
      <div className={modalWindowClassName}>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-12">{showModalWindow.message}</div>
          </div>
          <div className="row no-gutters">{btnRow}</div>
        </div>
      </div>
    ) : (
      <div />
    );
  }

  render() {
    const { showModalWindow, battlePaneConfirmEscapeBattle } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider value={{ creditMsg: GLOBALCONST.CREDIT_MSG }}>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Home
                {...routeProps}
                battlePaneConfirmEscapeBattle={battlePaneConfirmEscapeBattle}
                setShowModalWindowStates={this.setShowModalWindowStates}
                setBattlePaneConfirmEscapeBattle={this.setBattlePaneConfirmEscapeBattle}
              />
            )}
          />
          <Route path="/signIn" render={routeProps => <SignIn {...routeProps} />} />
          <Route path="/signUp" render={routeProps => <SignUp {...routeProps} />} />
          <Route path="/tutorial" render={routeProps => <Tutorial {...routeProps} />} />
          <Portal showModalWindow={showModalWindow}>{this.renderModalWindow()}</Portal>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  DAPgetNextArea: PropTypes.func.isRequired,
  DAPgainExp: PropTypes.func.isRequired,
  DAPobtainAnItem: PropTypes.func.isRequired,
  DAPsetVitalStat: PropTypes.func.isRequired,
  DAPupdateCoinPurse: PropTypes.func.isRequired,
  SAPnextAreaId: PropTypes.string.isRequired
};

// SAP -> (Redux) State As Prop
// alternatively, use getState method in the action creator function.
function mapStateToProps(state) {
  return {
    SAPnextAreaId: state.generalReducer.areaInfo.nextAreaId,
    SAPvitalStat: state.generalReducer.playerVitalStat
  };
}

// DAP -> Dispatch (action creator function) As Prop
function mapDispatchToProps(dispatch) {
  return {
    DAPgetNextArea: (nextAreaId, mode) => dispatch(getNextArea(nextAreaId, mode)),
    DAPgainExp: point => dispatch(gainExp(point)),
    DAPupdateCoinPurse: coinValue => dispatch(updateCoinPurse(coinValue)),
    DAPobtainAnItem: (item, itemType, coinValue) =>
      dispatch(obtainAnItem(item, itemType, coinValue)),
    DAPsetVitalStat: (type, point) => dispatch(setVitalStat(type, point))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
