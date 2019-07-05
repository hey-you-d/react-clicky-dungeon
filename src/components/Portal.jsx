import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { GLOBALCONST } from '../AppContext';

export default class Portal extends Component {
  constructor(props) {
    super(props);

    this.portalRoot = null;
    this.domNode = document.createElement('div');
  }

  componentDidMount() {
    // this DOM node is defined in Root.jsx
    this.portalRoot = document.getElementById('portal');
    this.portalRoot.appendChild(this.domNode);
  }

  componnentWillUnmount() {
    this.portalRoot.removeChild(this.domNode);
  }

  render() {
    const { children, showModalWindow } = this.props;

    this.domNode.className =
      showModalWindow.type !== GLOBALCONST.MODAL_WINDOW.NONE ? 'Portal' : null;

    return ReactDOM.createPortal(children, this.domNode);
  }
}

Portal.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  showModalWindow: PropTypes.instanceOf(Object).isRequired
};
