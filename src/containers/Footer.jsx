import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import HeroBtn from '../components/HeroBtn';
import ShopButton from '../components/ShopButton';

import ImageMarkup from '../components/ImageMarkup';

import { AppContext, GLOBALCONST } from '../AppContext';

import backpack from '../svg/si-glyph-back-pack.svg';
import github from '../img/iconmonstr-github-1.svg';
import linkedin from '../img/iconmonstr-linkedin-3.svg';

class Footer extends Component {
  creditBtnClickHandler(e) {
    const { setShowModalWindowStates } = this.props;
    const { creditMsg } = this.context;

    e.preventDefault();

    setShowModalWindowStates(
      GLOBALCONST.MODAL_WINDOW.NOTIFICATION,
      GLOBALCONST.MODAL_WINDOW_CONTEXT.CREDIT,
      creditMsg,
      'Cool!',
      {}
    );
  }

  render() {
    const {
      onHeroBtnClickHandler,
      onEquipmentBtnClickHandler,
      onShopBtnClickHandler,
      SAPcurrentAreaId,
      SAPmoney
    } = this.props;

    return (
      <footer>
        {/* Fixed footer */}
        <HeroBtn onClickHandler={onHeroBtnClickHandler} />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="ingame-hyper-box-decor" />
              <ShopButton
                SAPcurrentAreaId={SAPcurrentAreaId}
                SAPmoney={SAPmoney}
                onShopBtnClickHandler={onShopBtnClickHandler}
              />
            </div>
            <div className="col-6" />
            <div className="col-3">
              <div className="ingame-hyper-box-decor" />
              <div
                role="button"
                tabIndex={-1}
                className="ingame-hyper-box ingame-goto-inventory"
                onClick={onEquipmentBtnClickHandler}
                onKeyPress={onEquipmentBtnClickHandler}
              >
                <div>
                  <ImageMarkup
                    reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                    alt="goto inventory page"
                    classes=""
                    src=""
                    dataSrc={backpack}
                    dataSrcSet={backpack}
                    observeInDidUpdate={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row ingame-footer-morestuff">
            <div className="col-6">
              <div className="footer-morestuff-lhs">
                <div className="tutorial-button">
                  <Link to="/tutorial">TUTORIAL</Link>
                </div>
                <div
                  role="button"
                  tabIndex={-1}
                  className="credit-button"
                  onClick={e => this.creditBtnClickHandler(e)}
                  onKeyPress={e => this.creditBtnClickHandler(e)}
                >
                  CREDIT
                </div>
              </div>
            </div>
            <div className="col-6">
              <a href="https://github.com/hey-you-d">
                <ImageMarkup
                  reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                  alt="link to github page"
                  classes=""
                  src=""
                  dataSrc={github}
                  dataSrcSet={github}
                  observeInDidUpdate={false}
                />
              </a>
              <a href="https://au.linkedin.com/in/yudiman-kwanmas-4a5415100">
                <ImageMarkup
                  reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                  alt="link to linkedin page"
                  classes=""
                  src=""
                  dataSrc={linkedin}
                  dataSrcSet={linkedin}
                  observeInDidUpdate={false}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.contextType = AppContext;

Footer.propTypes = {
  onHeroBtnClickHandler: PropTypes.func.isRequired,
  onShopBtnClickHandler: PropTypes.func.isRequired,
  onEquipmentBtnClickHandler: PropTypes.func.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired,
  SAPcurrentAreaId: PropTypes.string.isRequired,
  SAPmoney: PropTypes.number.isRequired
};

export default withRouter(connect()(Footer));
