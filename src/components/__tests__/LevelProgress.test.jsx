import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LevelProgress from '../LevelProgress';

configure({ adapter: new Adapter() });

describe('<LevelProgress />', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      SAPcurrentAreaId: '1-0',
      SAPplayerCurrentExp: 50,
      SAPplayerTargetExp: 100
    };
    wrapper = shallow(<LevelProgress {...mockProps} />);
  });

  describe('<LevelProgress />', () => {
    it('should render the markup defined in `renderExpPoint` properly', () => {
      let markup = wrapper
        .find('div.ingame-lvprogress-container')
        .find('div.row')
        .at(0)
        .html();

      expect(markup).toEqual(
        '<div class="row"><div class="col-6">Area 1-0</div><div class="col-6">50/100 Exp</div></div>'
      );
      // Alternatively...
      markup = wrapper
        .find('div.ingame-lvprogress-container')
        .find('div.row')
        .at(0)
        .childAt(0)
        .html();

      expect(markup).toEqual('<div class="col-6">Area 1-0</div>');
      markup = wrapper
        .find('div.ingame-lvprogress-container')
        .find('div.row')
        .at(0)
        .childAt(1)
        .html();

      expect(markup).toEqual('<div class="col-6">50/100 Exp</div>');
    });

    it('should render the markup defined in `renderExpBar` properly', () => {
      const markup = wrapper
        .find('div.ingame-lvprogress-container')
        .find('div.ingame-lvprogress-bar')
        .find('div.col-12')
        .children();

      expect(markup).toHaveLength(14);
      // Alternatively...
      expect(markup.findWhere(n => n.type() === 'img' && n.hasClass('hidden-el'))).toHaveLength(0);
    });
  });
});
