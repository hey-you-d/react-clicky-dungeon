import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GLOBALCONST } from '../AppContext';

import loadingIconPng from '../img/iconmonstr-loading-17-32.png';

class SvgMarkup extends Component {
  constructor(props) {
    super(props);

    this.svgRef = React.svgRef();
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
    const { svgRef, imgRef } = this.props;
    const tgtSvgRef =
      svgRef === GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF ? this.svgRef : svgRef;
    const imgSvgRef =
      imgRef === GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF ? this.imgRef : imgRef;

    [tgtSvgRef, imgSvgRef].forEach(tgtRef => {
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
    });
  }

  render() {
    const { svgRef, imgRef, alt, classes, dataSrc, dataSrcSet, src } = this.props;

    return (
      <object
        type="image/svg+xml"
        ref={svgRef === GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF ? this.svgRef : svgRef}
        className={classes}
        data={src === '' ? loadingIconPng : src}
        data-src={dataSrc}
        data-srcset={dataSrcSet}
      >
        <img
          ref={imgRef === GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF ? this.imgRef : imgRef}
          alt={alt}
          className={classes}
          src={src === '' ? loadingIconPng : src}
          data-src={dataSrc}
          data-srcset={dataSrcSet}
        />
      </object>
    );
  }
}

SvgMarkup.propTypes = {
  svgRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  imgRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  alt: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  dataSrcSet: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  observeInDidUpdate: PropTypes.bool.isRequired
};

export default SvgMarkup;
