import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import CentrePane from '../../containers/CentrePane';
import Equipment from '../Equipment';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

const preloadedState = {
  generalReducer: GLOBALCONST.PRELOADED_STATE
};

describe('<Equipment />', () => {
  it('should be rendered properly by the CentrePane under the right condition', () => {
    // condition: showEquipmentPane props must be true
    const centrePaneMockProps = {
      showEquipmentPane: true,
      showCharUpgradePane: false,
      showShopPane: false,
      showBattlePane: false,
      battlePaneConfirmEscapeBattle: false,
      battlePaneUseItemBtnWasClicked: false,
      setBattlePaneConfirmEscapeBattle: jest.fn(),
      heroBtnClickHandler: jest.fn(),
      showBattlePaneEventHandler: jest.fn(),
      battlePaneEnemyTurnAfterUsingItem: false,
      battlePaneUseItemBtnClickEventHandler: jest.fn(),
      battlePaneRunBtnClickHandler: jest.fn(),
      battlePaneBattleOverEventHandler: jest.fn(),
      setBattlePaneEnemyTurnAfterUsingItemToFalse: jest.fn(),
      setShowModalWindowStates: jest.fn()
    };

    const mockStore = configureStore();
    const store = mockStore(preloadedState);
    const centrePaneWrapper = shallow(<CentrePane store={store} {...centrePaneMockProps} />);

    const component = centrePaneWrapper
      .dive() // Provider -> CentrePane
      .dive() // CentrePane -> Fragment
      .find(Equipment);

    expect(component.length).toEqual(1);
  });

  it('should display the equipped equipment properly under a right condition', () => {
    const mockSAPplayerEquipment = {
      sword: GLOBALCONST.SAP_ITEM,
      shield: GLOBALCONST.SAP_ITEM,
      armour: GLOBALCONST.SAP_ITEM
    };
    const wrapper = shallow(<Equipment SAPplayerEquipment={mockSAPplayerEquipment} />);

    expect(wrapper.find('.equipment-slot-innerborder-occupied').length).toEqual(3);

    wrapper.setProps({
      SAPplayerEquipment: {
        sword: GLOBALCONST.INVENTORY_EMPTY_SLOT,
        shield: GLOBALCONST.INVENTORY_EMPTY_SLOT,
        armour: GLOBALCONST.INVENTORY_EMPTY_SLOT
      }
    });

    expect(wrapper.find('.equipment-slot-innerborder-occupied').length).toEqual(0);

    expect(wrapper.find('div.tstTagSwordLabel').text()).toEqual('[Sword]');
    expect(wrapper.find('div.tstTagShieldLabel').text()).toEqual('[Shield]');
    expect(wrapper.find('div.tstTagArmourLabel').text()).toEqual('[Armour]');
  });
});
