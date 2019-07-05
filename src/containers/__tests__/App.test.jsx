import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Root from '../Root';
import App from '../App';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

const preloadedState = {
  generalReducer: GLOBALCONST.PRELOADED_STATE
};

describe('<App />', () => {
  it('should be rendered by Root component', () => {
    expect(shallow(<Root />).find('Connect(App)')).toHaveLength(1);
  });
  it('should render properly', () => {
    const wrapper = shallow(
      <Provider store={configureStore()(preloadedState)}>
        <App />
      </Provider>
    );
    const component = wrapper.dive();

    expect(component.debug()).toEqual('<Connect(App) />');
    // alternatively
    expect(component.find(App).length).toEqual(1);

    expect(toJson(component)).toMatchSnapshot();
  });
});
