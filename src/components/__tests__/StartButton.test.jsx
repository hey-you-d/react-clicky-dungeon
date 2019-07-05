import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { GLOBALCONST } from '../../AppContext';

import StartButton from '../StartButton';

configure({ adapter: new Adapter() });

describe('<StartButton />', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {
      SAPcurrentAreaId: GLOBALCONST.AREA_NOT_FOUND_ID,
      setShowModalWindowStates: jest.fn(),
      onClickHandler: jest.fn()
    };
  });

  it('should call the function specified in onClick attribute', () => {
    wrapper = shallow(<StartButton {...mockProps} />);
    wrapper.find('button.start-button').simulate('click');

    expect(mockProps.onClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should invokes `componentDidMount` exactly once when mounted', () => {
    const spy = jest.spyOn(StartButton.prototype, 'componentDidMount');
    wrapper = shallow(<StartButton {...mockProps} />);

    expect(StartButton.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    // alternatively
    expect(StartButton.prototype.componentDidMount.mock.calls.length).toEqual(1);

    spy.mockClear();
  });

  it('should call the `setShowModalWindowStates` under the right condition', () => {
    // check dev_notes for the hint to test Portal being rendered under the right condition.
    mockProps.SAPcurrentAreaId = GLOBALCONST.AREA_NOT_FOUND_ID;
    wrapper = shallow(<StartButton {...mockProps} />);

    expect(mockProps.setShowModalWindowStates).toHaveBeenCalledTimes(1);
  });
});
