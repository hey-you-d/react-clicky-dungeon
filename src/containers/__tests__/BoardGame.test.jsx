import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import CentrePane from '../CentrePane';
import BoardGame from '../BoardGame';
import BoardCell from '../../components/BoardCell';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

describe('<BoardGame />', () => {
  let wrapper;
  let mockProps;
  let preloadedState;
  let mockStore;
  let store;

  beforeEach(() => {
    // prettier-ignore
    mockProps = {
      setShowBattlePaneStates: jest.fn(),
      setShowModalWindowStates: jest.fn(),
      SAPareaInfo: {
        currentAreaId: '1-0',
        nextAreaId: '1-1',
        areaMap: [
            ["A-2", "S-2", "W-2", "I-3", "I-2", "X"],
            ["X", "E-1-3", "I-1", "X", "EXIT", "X"],
            ["X", "X", "E-1-1", "X", "I-4", "I-2"],
            ["A-1", "W-1", "S-1", "I-1", "E-1-1", "X"],
            ["X", "START", "X", "X", "E-2-1", "X"],
            ["I-4", "X", "X", "I-4", "X", "X"]
        ],
        areaEnemies: [],
        areaItems: [],
        areaEquipments: [],
        areaDoors: []
      }
    };
    preloadedState = {
      generalReducer: GLOBALCONST.PRELOADED_STATE
    };
  });

  it('should be rendered properly by the CentrePane under the right condition', () => {
    // conditions: showEquipmentPane, showCharUpgradePane, showShopPane, showBattlePane, &
    // battlePaneConfirmEscapeBattle props must be false
    const centrePaneMockProps = {
      showEquipmentPane: false,
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

    mockStore = configureStore();
    store = mockStore(preloadedState);

    const centrePaneWrapper = shallow(<CentrePane store={store} {...centrePaneMockProps} />);

    const component = centrePaneWrapper
      .dive() // Provider -> CentrePane
      .dive() // CentrePane -> Fragment
      .find(BoardGame);

    expect(component.length).toEqual(1);
  });

  it('should contain exactly 36 <BoardCell /> tiles', () => {
    mockStore = configureStore();
    store = mockStore(preloadedState);

    wrapper = mount(<BoardGame store={store} {...mockProps} />);

    expect(wrapper.find('BoardCell').length).toEqual(36);

    wrapper.unmount();

    // alternatively...
    wrapper = shallow(<BoardGame store={store} {...mockProps} />);

    const components = wrapper
      .dive() // ingame-board-container -> row
      .dive()
      .find(BoardCell);

    expect(components.length).toEqual(36);
  });

  it(`should contain exactly 1 <BoardCell /> tile with "explored" state as the
  starting tile after the initial render`, () => {
    mockStore = configureStore();
    store = mockStore(preloadedState);

    wrapper = mount(<BoardGame store={store} {...mockProps} />);
    expect(wrapper.find('div.board-tile-explored-mode').length).toEqual(1);
    expect(wrapper.find('div.board-tile-fow-mode').length).toEqual(35);

    wrapper.unmount();
  });
});
