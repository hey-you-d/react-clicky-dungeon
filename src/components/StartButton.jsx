import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppContext, GLOBALCONST } from '../AppContext';

class StartButton extends Component {
  componentDidMount() {
    const { setShowModalWindowStates, SAPcurrentAreaId } = this.props;
    const { creditMsg } = this.context;

    if (SAPcurrentAreaId === GLOBALCONST.AREA_NOT_FOUND_ID) {
      setShowModalWindowStates(
        GLOBALCONST.MODAL_WINDOW.NOTIFICATION,
        GLOBALCONST.MODAL_WINDOW_CONTEXT.CREDIT,
        creditMsg,
        'Cool!',
        {}
      );
    }
  }

  render() {
    const { onClickHandler, startBtnClassNames, loadingTxtClassNames } = this.props;

    return (
      <div className="container ingame-startbtn-container">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="start-button-container">
              {/* prettier-ignore */}
              <button type="button" className={startBtnClassNames} onClick={e => onClickHandler(e)}>START GAME</button>
              <p className={loadingTxtClassNames}>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StartButton.contextType = AppContext;

StartButton.propTypes = {
  SAPcurrentAreaId: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired,
  startBtnClassNames: PropTypes.string.isRequired,
  loadingTxtClassNames: PropTypes.string.isRequired
};

export default StartButton;
