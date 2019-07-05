import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import CentrePane from '../../containers/CentrePane';
import CharUpgrade from '../CharUpgrade';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

const preloadedState = {
  generalReducer: GLOBALCONST.PRELOADED_STATE
};

describe('<CharUpgrade />', () => {
  let wrapper;
  let mockProps;
  let mockInitState;

  beforeEach(() => {
    mockProps = {
      SAPplayerAtkAttr: 1,
      SAPplayerDefAttr: 1,
      SAPavailableAttrPt: 3,
      SAPplayerVitalStat: {
        remainingHP: 1,
        maxHP: 1,
        remainingMP: 1,
        maxMP: 1,
        remainingST: 1,
        maxST: 1
      },
      SAPplayerEquipment: {
        sword: GLOBALCONST.INVENTORY_EMPTY_SLOT,
        shield: GLOBALCONST.INVENTORY_EMPTY_SLOT,
        armour: GLOBALCONST.INVENTORY_EMPTY_SLOT
      },
      availablePoint: 3, // the default value is equal to SAPavailableAttrPt
      charUpgradeOkButtonClickHandler: jest.fn()
    };
    mockInitState = {
      availablePoint: mockProps.SAPavailableAttrPt,
      maxBaseHpAttr: mockProps.SAPplayerVitalStat.maxHP,
      maxBaseMpAttr: mockProps.SAPplayerVitalStat.maxMP,
      maxBaseStAttr: mockProps.SAPplayerVitalStat.maxST,
      baseAtkAttr: mockProps.SAPplayerAtkAttr,
      baseDefAttr: mockProps.SAPplayerDefAttr
    };
  });

  it('should be rendered properly by the CentrePane under the right condition', () => {
    // condition: showCharUpgradePane props must be true
    const centrePaneMockProps = {
      showEquipmentPane: false,
      showCharUpgradePane: true,
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
      .find(CharUpgrade);

    expect(component.length).toEqual(1);
  });

  it('should reset all attribute points back to the initial value after clicking the reset button', () => {
    wrapper = shallow(<CharUpgrade {...mockProps} />);

    // #1 - In this test case, the mockInitState value will be a non default value
    wrapper.setState({
      availablePoint: 1, // from 3
      maxBaseHpAttr: 2, // from 1
      maxBaseMpAttr: 2, // from 1
      maxBaseStAttr: 1,
      baseAtkAttr: 1,
      baseDefAttr: 1
    });

    const resetBtn = wrapper.find('div.levelup-reset-point-dist');
    resetBtn.simulate('click');

    expect(wrapper.instance().state).toEqual(mockInitState);

    // #2 - Different initial state
    wrapper.setState({
      availablePoint: 0, // from 3
      maxBaseHpAttr: 1,
      maxBaseMpAttr: 1,
      maxBaseStAttr: 2, // from 1
      baseAtkAttr: 2, // from 1
      baseDefAttr: 2 // from 1
    });

    resetBtn.simulate('click');

    expect(wrapper.instance().state).toEqual(mockInitState);
  });

  it('should assign the attribute point properly before confirming with "OK" btn #1', () => {
    wrapper = shallow(<CharUpgrade {...mockProps} />);

    const tgtBtns = {
      hpDecreaseBtn: wrapper.find('div.tst-tag-hp-decrease'),
      hpIncreaseBtn: wrapper.find('div.tst-tag-hp-increase'),
      mpDecreaseBtn: wrapper.find('div.tst-tag-mp-decrease'),
      mpIncreaseBtn: wrapper.find('div.tst-tag-mp-increase'),
      stDecreaseBtn: wrapper.find('div.tst-tag-mp-decrease'),
      stIncreaseBtn: wrapper.find('div.tst-tag-st-increase'),
      atkDecreaseBtn: wrapper.find('div.tst-tag-atk-decrease'),
      atkIncreaseBtn: wrapper.find('div.tst-tag-atk-increase'),
      defDecreaseBtn: wrapper.find('div.tst-tag-def-decrease'),
      defIncreaseBtn: wrapper.find('div.tst-tag-def-increase')
    };

    // #1
    tgtBtns.hpDecreaseBtn.simulate('click');
    tgtBtns.mpDecreaseBtn.simulate('click');
    tgtBtns.stDecreaseBtn.simulate('click');
    tgtBtns.atkDecreaseBtn.simulate('click');
    tgtBtns.defDecreaseBtn.simulate('click');

    expect(wrapper.instance().state).toEqual(mockInitState);

    // #2
    tgtBtns.hpIncreaseBtn.simulate('click');
    tgtBtns.mpIncreaseBtn.simulate('click');
    tgtBtns.stIncreaseBtn.simulate('click');
    tgtBtns.atkIncreaseBtn.simulate('click');
    tgtBtns.defIncreaseBtn.simulate('click');

    const expectedNextState = {
      availablePoint: 0, // from 3
      maxBaseHpAttr: 2, // from 1
      maxBaseMpAttr: 2, // from 1
      maxBaseStAttr: 2, // from 1
      baseAtkAttr: 1, // no attribute pt left
      baseDefAttr: 1 // no attribute pt left
    };
    expect(wrapper.instance().state).toEqual(expectedNextState);
  });

  it('should assign the attribute point properly before confirming with "OK" btn #2', () => {
    wrapper = shallow(<CharUpgrade {...mockProps} />);

    const tgtBtns = {
      hpDecreaseBtn: wrapper.find('div.tst-tag-hp-decrease'),
      hpIncreaseBtn: wrapper.find('div.tst-tag-hp-increase'),
      mpDecreaseBtn: wrapper.find('div.tst-tag-mp-decrease'),
      mpIncreaseBtn: wrapper.find('div.tst-tag-mp-increase'),
      stDecreaseBtn: wrapper.find('div.tst-tag-mp-decrease'),
      stIncreaseBtn: wrapper.find('div.tst-tag-st-increase'),
      atkDecreaseBtn: wrapper.find('div.tst-tag-atk-decrease'),
      atkIncreaseBtn: wrapper.find('div.tst-tag-atk-increase'),
      defDecreaseBtn: wrapper.find('div.tst-tag-def-decrease'),
      defIncreaseBtn: wrapper.find('div.tst-tag-def-increase')
    };

    const altmockInitState = {
      availablePoint: 0, // max 3
      maxBaseHpAttr: 2,
      maxBaseMpAttr: 2,
      maxBaseStAttr: 2,
      baseAtkAttr: 1,
      baseDefAttr: 1
    };
    wrapper.setState(altmockInitState);

    tgtBtns.hpDecreaseBtn.simulate('click');
    tgtBtns.mpDecreaseBtn.simulate('click');
    tgtBtns.stIncreaseBtn.simulate('click');
    tgtBtns.atkDecreaseBtn.simulate('click');
    tgtBtns.defIncreaseBtn.simulate('click');

    const expectedNextState = {
      availablePoint: 1,
      maxBaseHpAttr: 1,
      maxBaseMpAttr: 1,
      maxBaseStAttr: 3,
      baseAtkAttr: 1,
      baseDefAttr: 2
    };
    expect(wrapper.instance().state).toEqual(expectedNextState);
  });
});
