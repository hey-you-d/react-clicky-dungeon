import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeroBtn from '../HeroBtn';

configure({ adapter: new Adapter() });

describe('<HeroBtn />', () => {
  let wrapper;
  let mockClickHandler;

  beforeEach(() => {
    mockClickHandler = jest.fn();
  });

  it('should render properly', () => {
    wrapper = shallow(<HeroBtn onClickHandler={mockClickHandler} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call the function specified in onClick attribute', () => {
    wrapper = shallow(<HeroBtn onClickHandler={mockClickHandler} />);

    wrapper.find('div.ingame-profilepic-box').simulate('click');

    expect(mockClickHandler).toHaveBeenCalled();
  });
});
