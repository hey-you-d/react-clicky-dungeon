import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Root from '../Root';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

const preloadedState = {
  generalReducer: GLOBALCONST.PRELOADED_STATE
};

describe('<Root />', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <Provider store={configureStore()(preloadedState)}>
        <Root />
      </Provider>
    );
    const component = wrapper.dive();

    expect(component.debug()).toEqual('<Root />');
    // alternatively
    expect(component.find(Root).length).toEqual(1);

    expect(toJson(component)).toMatchSnapshot();
  });
});
