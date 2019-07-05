import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageMarkup from './ImageMarkup';
import MoneyIndicator from './MoneyIndicator';

import { GLOBALCONST } from '../AppContext';

import coinstack from '../svg/si-glyph-money-coin.svg';

export default class ShopButton extends Component {
  static renderShopLabel() {
    return <div className="ingame-goto-shop-label">SHOP</div>;
  }

  static renderMoneyIcon() {
    return (
      <div>
        <ImageMarkup
          reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
          alt="stack of coins"
          classes=""
          src=""
          dataSrc={coinstack}
          dataSrcSet={coinstack}
          observeInDidUpdate={false}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      showShopLabel: false
    };
  }

  setConditionalRenderingToLabel(doIt) {
    const { SAPcurrentAreaId } = this.props;

    if (SAPcurrentAreaId !== GLOBALCONST.EPOCH_AREA_ID && doIt) {
      this.setState({ showShopLabel: true });
    } else {
      this.setState({ showShopLabel: false });
    }
  }

  render() {
    const { SAPmoney, onShopBtnClickHandler } = this.props;
    const { showShopLabel } = this.state;
    const conditionalRendering = showShopLabel
      ? ShopButton.renderShopLabel()
      : ShopButton.renderMoneyIcon();

    return (
      <div
        role="button"
        tabIndex={-1}
        className="ingame-hyper-box ingame-goto-shop"
        onMouseEnter={() => this.setConditionalRenderingToLabel(true)}
        onMouseLeave={() => this.setConditionalRenderingToLabel(false)}
        onClick={() => onShopBtnClickHandler()}
        onKeyPress={() => onShopBtnClickHandler()}
      >
        <div>{conditionalRendering}</div>
        <MoneyIndicator SAPmoney={SAPmoney} />
      </div>
    );
  }
}

ShopButton.propTypes = {
  SAPmoney: PropTypes.number.isRequired,
  SAPcurrentAreaId: PropTypes.string.isRequired,
  onShopBtnClickHandler: PropTypes.func.isRequired
};
