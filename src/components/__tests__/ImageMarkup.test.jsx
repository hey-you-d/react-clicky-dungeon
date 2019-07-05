import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ImageMarkup from '../ImageMarkup';

import { GLOBALCONST } from '../../AppContext';
import loadingIconPng from '../../img/iconmonstr-loading-17-32.png';

configure({ adapter: new Adapter() });

describe('<ImageMarkup />', () => {
  let wrapper;
  let mockProps;
  let mockLocallyDefinedRef;

  const mockRef = document.createElement('img');
  const mockAttrs = {
    alt: document.createAttribute('alt'),
    className: document.createAttribute('className'),
    dataSrc: document.createAttribute('data-src'),
    dataSrcset: document.createAttribute('data-srcset'),
    src: document.createAttribute('src')
  };
  mockAttrs.src.value = 'iconmonstr-loading-17-32.png';
  mockRef.setAttributeNode(mockAttrs.alt);
  mockRef.setAttributeNode(mockAttrs.className);
  mockRef.setAttributeNode(mockAttrs.dataSrc);
  mockRef.setAttributeNode(mockAttrs.dataSrcset);
  mockRef.setAttributeNode(mockAttrs.src);

  beforeEach(() => {
    mockLocallyDefinedRef = {
      current: mockRef
    };
    mockProps = {
      reference: GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF,
      alt: '',
      classes: '',
      dataSrc: '',
      dataSrcSet: '',
      src: '',
      observeInDidUpdate: false
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    wrapper = shallow(<ImageMarkup {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should accept all props specified in mockProps', () => {
    wrapper = mount(<ImageMarkup {...mockProps} />);

    expect(wrapper.props()).toEqual(mockProps);
    expect(wrapper.props().reference).toEqual(mockProps.reference);
    expect(wrapper.props().alt).toEqual(mockProps.alt);
    expect(wrapper.props().classes).toEqual(mockProps.classes);
    expect(wrapper.props().dataSrc).toEqual(mockProps.dataSrc);
    expect(wrapper.props().dataSrcSet).toEqual(mockProps.dataSrcSet);
    expect(wrapper.props().src).toEqual(mockProps.src);
    expect(wrapper.props().observeInDidUpdate).toEqual(mockProps.observeInDidUpdate);
  });

  it('should assign all passed props to the right markup attributes', () => {
    wrapper = mount(<ImageMarkup {...mockProps} />);

    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('img').prop('alt')).toEqual(mockProps.alt);
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('img').prop('src')).toEqual(loadingIconPng);
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('img').prop('data-src')).toEqual(mockProps.dataSrc);
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('img').prop('data-srcset')).toEqual(mockProps.dataSrcSet);
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('img').prop('className')).toEqual(mockProps.classes);

    wrapper.unmount();
  });

  it('should not render the default loading image if the passed src prop is not an empty string', () => {
    wrapper = shallow(<ImageMarkup {...mockProps} />);

    mockProps.src = 'randomImgPath';
    wrapper.setProps(mockProps);
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.prop('src')).toEqual(mockProps.src);
  });

  if (
    // eslint-disable-next-line no-constant-condition
    ('should contain the forwarded ref in ImageMarkup component if the passed ref is not the default value',
    () => {
      // https://stackoverflow.com/questions/50720639/enzyme-test-react-createref
      const ParentComponent = React.forwardRef((props, ref) => {
        // eslint-disable-next-line no-unused-expressions
        <ImageMarkup
          reference={ref}
          alt="mock"
          classes="mock"
          src="mock"
          dataSrc="mock"
          dataSrcSet="mock"
          observeInDidUpdate={false}
        />;
      });

      wrapper = mount(
        <React.Fragment>
          <ParentComponent ref={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF} />
        </React.Fragment>
      );

      expect(wrapper.find('img').instance()).toEqual(mockLocallyDefinedRef.current);

      wrapper.unmount();

      const nonDefaultSampleRef = React.createRef();
      wrapper = mount(
        <React.Fragment>
          <ParentComponent ref={nonDefaultSampleRef} />
        </React.Fragment>
      );

      expect(wrapper.find('img').instance()).toEqual(nonDefaultSampleRef);

      wrapper.unmount();
    })
  );

  it('should invokes `componentDidMount` exactly once when mounted', () => {
    const spy = jest.spyOn(ImageMarkup.prototype, 'componentDidMount');
    wrapper = shallow(<ImageMarkup {...mockProps} />);

    expect(ImageMarkup.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    // alternatively
    expect(ImageMarkup.prototype.componentDidMount.mock.calls.length).toEqual(1);

    spy.mockClear();
  });

  it('should invokes `componentDidUpdate` if observeInDidUpdate prop is set to true', () => {
    const spy = jest.spyOn(ImageMarkup.prototype, 'componentDidUpdate');
    wrapper = shallow(<ImageMarkup {...mockProps} />);
    mockProps.observeInDidUpdate = true;
    wrapper.setProps(mockProps);
    expect(ImageMarkup.prototype.componentDidUpdate).toBeCalled();
    spy.mockClear();
  });

  it('should call the observeImageLazyLoading function', () => {
    const spy = jest.spyOn(ImageMarkup.prototype, 'observeImageLazyLoading');
    wrapper = shallow(<ImageMarkup {...mockProps} />);

    wrapper.instance().observeImageLazyLoading();
    expect(spy).toHaveBeenCalled();

    spy.mockClear();
  });

  // https://stackoverflow.com/questions/54942892/jest-enzyme-test-a-function-call-in-componentdidmount
  it('should call the observeImageLazyLoading function in componentDidMount', () => {
    wrapper = shallow(<ImageMarkup {...mockProps} />);

    // assign your instance to the wrapper
    const instance = wrapper.instance();
    // spy on observeImageLazyLoading
    const spy = jest.spyOn(instance, 'observeImageLazyLoading');

    // recall the componentDidMount lifecycle is automatically called after mounting the
    // component.
    instance.componentDidMount();
    expect(instance.observeImageLazyLoading).toHaveBeenCalledTimes(2);

    spy.mockClear();
  });

  it('should call the observeImageLazyLoading function in componentDidUpdate', () => {
    wrapper = shallow(<ImageMarkup {...mockProps} />);

    // assign your instance to the wrapper
    const instance = wrapper.instance();
    // spy on observeImageLazyLoading
    const spy = jest.spyOn(instance, 'observeImageLazyLoading');

    instance.componentDidUpdate();
    mockProps.observeInDidUpdate = false;
    wrapper.setProps(mockProps);
    // recall the observeImageLazyLoading function is called in componentDidMount lifecycle
    // during then initial mount, hence before invoking componentDidUpdate, the function
    // will have been called once.
    expect(instance.observeImageLazyLoading).toHaveBeenCalledTimes(1);

    spy.mockReset();

    mockProps.observeInDidUpdate = true;
    wrapper.setProps(mockProps);
    instance.componentDidUpdate();
    expect(instance.observeImageLazyLoading).toHaveBeenCalledTimes(2);

    spy.mockClear();
  });
});
