import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import Footer from '../Footer';
import ShopButton from '../../components/ShopButton';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  let wrapper;
  let mockProps;
  let preloadedState;

  beforeEach(() => {
    mockProps = {
      onHeroBtnClickHandler: jest.fn(),
      onShopBtnClickHandler: jest.fn(),
      onEquipmentBtnClickHandler: jest.fn(),
      setShowModalWindowStates: jest.fn(),
      SAPcurrentAreaId: '1-0',
      SAPmoney: 135
    };
    wrapper = shallow(<Footer {...mockProps} />);
    preloadedState = {
      generalReducer: GLOBALCONST.PRELOADED_STATE
    };
  });

  it('should redirect user to the tutorial page by clicking the tutorial button', () => {
    wrapper = mount(
      <Provider store={configureStore()(preloadedState)}>
        <MemoryRouter>
          <Footer {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('Link').props().to).toBe('/tutorial');

    wrapper.unmount();
  });

  it('should render the `ShopButton` child component', () => {
    // `shallow` doesn't render child component, must use `mount`
    wrapper = mount(
      <Provider store={configureStore()(preloadedState)}>
        <MemoryRouter>
          <Footer {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(ShopButton).length).toEqual(1);
  });
});
