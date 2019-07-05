import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShopPane from '../ShopPane';

configure({ adapter: new Adapter() });

describe('<ShopPane />', () => {
  it('should render properly', () => {
    const wrapper = shallow(<ShopPane />);

    expect(wrapper).toMatchSnapshot();
  });
});
