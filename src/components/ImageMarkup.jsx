import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GLOBALCONST } from '../AppContext';

import loadingIconPng from '../img/iconmonstr-loading-17-32.png';

class ImageMarkup extends Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  componentDidMount() {
    this.observeImageLazyLoading();
  }

  componentDidUpdate() {
    const { observeInDidUpdate } = this.props;

    if (observeInDidUpdate) {
      this.observeImageLazyLoading();
    }
  }

  observeImageLazyLoading() {
    // https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
    const { reference } = this.props;
    const tgtRef =
      reference === GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF ? this.imgRef : reference;

    if (tgtRef.current !== null) {
      if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.srcset = lazyImage.dataset.srcset;

              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });

        lazyImageObserver.observe(tgtRef.current);
      } else {
        // Possibly fall back to a more compatible method here
      }
    }
  }

  render() {
    const { reference, alt, classes, dataSrc, dataSrcSet, src } = this.props;

    return (
      <img
        ref={reference === GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF ? this.imgRef : reference}
        alt={alt}
        className={classes}
        src={src === '' ? loadingIconPng : src}
        data-src={dataSrc}
        data-srcset={dataSrcSet}
      />
    );
  }
}

ImageMarkup.propTypes = {
  reference: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  alt: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  dataSrcSet: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  observeInDidUpdate: PropTypes.bool.isRequired
};

export default ImageMarkup;
