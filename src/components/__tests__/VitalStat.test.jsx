import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VitalStat from '../VitalStat';

configure({ adapter: new Adapter() });

describe('<VitalStat />', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      SAPvitalStat: {
        remainingHP: 130,
        maxHP: 130,
        remainingMP: 50,
        maxMP: 50,
        remainingST: 100,
        maxST: 100
      }
    };
  });

  it('should render the right number of `+` in the vital stat bar indicator #1', () => {
    wrapper = shallow(<VitalStat {...mockProps} />);

    expect(
      wrapper
        .render()
        .find('div.tstTagHpBar')
        .find('span').length
    ).toEqual(10);
    expect(
      wrapper
        .render()
        .find('div.tstTagMpBar')
        .find('span').length
    ).toEqual(10);
    expect(
      wrapper
        .render()
        .find('div.tstTagStBar')
        .find('span').length
    ).toEqual(10);
  });

  it('should render the right number of `+` in the vital stat bar indicator #2', () => {
    mockProps = {
      SAPvitalStat: {
        remainingHP: 0,
        maxHP: 130,
        remainingMP: 0,
        maxMP: 50,
        remainingST: 0,
        maxST: 100
      }
    };

    wrapper = shallow(<VitalStat {...mockProps} />);

    expect(
      wrapper
        .render()
        .find('div.tstTagHpBar')
        .find('span.hidden-el').length
    ).toEqual(10);
    expect(
      wrapper
        .render()
        .find('div.tstTagMpBar')
        .find('span.hidden-el').length
    ).toEqual(10);
    expect(
      wrapper
        .render()
        .find('div.tstTagStBar')
        .find('span.hidden-el').length
    ).toEqual(10);
  });

  it('should render the right number of `+` in the vital stat bar indicator #3', () => {
    mockProps = {
      SAPvitalStat: {
        remainingHP: 65,
        maxHP: 130,
        remainingMP: 25,
        maxMP: 50,
        remainingST: 50,
        maxST: 100
      }
    };

    wrapper = shallow(<VitalStat {...mockProps} />);

    expect(
      wrapper
        .render()
        .find('div.tstTagHpBar')
        .find('span.hidden-el').length
    ).toEqual(5);
    expect(
      wrapper
        .render()
        .find('div.tstTagMpBar')
        .find('span.hidden-el').length
    ).toEqual(5);
    expect(
      wrapper
        .render()
        .find('div.tstTagStBar')
        .find('span.hidden-el').length
    ).toEqual(5);
  });

  it('should render the stat number correctly on the vital stat pane #1', () => {
    wrapper = shallow(<VitalStat {...mockProps} />);

    expect(
      wrapper
        .find('div.tstTagHpNum')
        .render()
        .text()
    ).toEqual('130130');
    expect(
      wrapper
        .find('div.tstTagMpNum')
        .render()
        .text()
    ).toEqual('5050');
    expect(
      wrapper
        .find('div.tstTagStNum')
        .render()
        .text()
    ).toEqual('100100');
  });

  it('should render the stat number correctly on the vital stat pane #2', () => {
    mockProps = {
      SAPvitalStat: {
        remainingHP: 0,
        maxHP: 130,
        remainingMP: 0,
        maxMP: 50,
        remainingST: 0,
        maxST: 100
      }
    };

    wrapper = shallow(<VitalStat {...mockProps} />);

    expect(
      wrapper
        .find('div.tstTagHpNum')
        .render()
        .text()
    ).toEqual('0130');
    expect(
      wrapper
        .find('div.tstTagMpNum')
        .render()
        .text()
    ).toEqual('050');
    expect(
      wrapper
        .find('div.tstTagStNum')
        .render()
        .text()
    ).toEqual('0100');
  });

  it('should render the stat number correctly on the vital stat pane #3', () => {
    mockProps = {
      SAPvitalStat: {
        remainingHP: 50,
        maxHP: 130,
        remainingMP: 10,
        maxMP: 50,
        remainingST: 3,
        maxST: 100
      }
    };

    wrapper = shallow(<VitalStat {...mockProps} />);

    expect(
      wrapper
        .find('div.tstTagHpNum')
        .render()
        .text()
    ).toEqual('50130');
    expect(
      wrapper
        .find('div.tstTagMpNum')
        .render()
        .text()
    ).toEqual('1050');
    expect(
      wrapper
        .find('div.tstTagStNum')
        .render()
        .text()
    ).toEqual('3100');
  });
});
