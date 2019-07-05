import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MoneyIndicator from '../MoneyIndicator';

configure({ adapter: new Adapter() });

describe('<MoneyIndicator />', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      SAPmoney: 135
    };
  });

  it('should render the mockProp correctly', () => {
    wrapper = shallow(<MoneyIndicator {...mockProps} />);

    expect(
      wrapper
        .find('div')
        .render()
        .html()
    ).toEqual('<span>135</span>&#xA0;<span>G</span>');
  });
});
