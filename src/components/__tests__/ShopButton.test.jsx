import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShopButton from '../ShopButton';

configure({ adapter: new Adapter() });

// https://www.asapdevelopers.com/mock-function-react-jest-enzyme/
jest.mock('../ImageMarkup');

describe('<ShopButton />', () => {
  let wrapper;
  let mockProps;
  let mockState;

  beforeEach(() => {
    mockState = {
      showShopLabel: false
    };
    mockProps = {
      SAPmoney: 0,
      SAPcurrentAreaId: '0-0',
      onShopBtnClickHandler: jest.fn()
    };
  });

  it('should set `showShopLabel` state to true on mouse enter & the active area id is not 0-0 (Epoch)', () => {
    wrapper = shallow(<ShopButton {...mockProps} />);
    const tgtButton = wrapper.find('div.ingame-goto-shop');

    tgtButton.simulate('mouseenter');
    expect(wrapper.state('showShopLabel')).toBe(false);

    mockProps.SAPcurrentAreaId = '1-0';
    wrapper.setProps(mockProps);
    tgtButton.simulate('mouseenter');
    expect(wrapper.state('showShopLabel')).toBe(true);
  });

  it('should render <ImageMarkup /> when `showShopLabel` state is false', () => {
    wrapper = shallow(<ShopButton {...mockProps} />);
    expect(wrapper.find('ImageMarkup').length).toEqual(1);

    const updatedMockState = Object.assign({}, mockState);
    updatedMockState.showShopLabel = true;
    wrapper.setState(updatedMockState);

    expect(wrapper.find('ImageMarkup').length).toEqual(0);
  });

  it('should display the `SHOP` label when the `showShopLabel` state value is true', () => {
    wrapper = mount(<ShopButton {...mockProps} />);
    const tgtButton = wrapper.find('div.ingame-goto-shop');

    const updatedMockState = Object.assign({}, mockState);
    updatedMockState.showShopLabel = true;
    wrapper.setState(updatedMockState);

    expect(tgtButton.render().find('div.ingame-goto-shop-label').length).toEqual(1);
    expect(
      tgtButton
        .render()
        .find('div.ingame-goto-shop-label')
        .text()
    ).toEqual('SHOP');

    wrapper.unmount();
  });
});
