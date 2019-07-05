import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import BoardGame from '../../containers/BoardGame';
import BoardCell from '../BoardCell';

import { GLOBALCONST } from '../../AppContext';

configure({ adapter: new Adapter() });

// prettier-ignore
const boardCellMockProps = {
  content: 'A-1',
  isStartTile: false,
  thisTileIdx: 18,
  tilesModeState: [
    "fow", "fow", "fow", "fow", "fow", "fow",
    "fow", "fow", "fow", "fow", "fow", "fow",
    "fow", "fow", "fow", "fow", "fow", "fow",
    "fow", "fow", "fow", "fow", "fow", "fow",
    "fow", "explored", "fow", "fow", "fow", "fow",
    "fow", "fow", "fow", "fow", "fow", "fow"
  ],
  updateTileStateHandler: jest.fn(),
  obtainItemHandler: jest.fn(),
  setShowBattlePaneStates: jest.fn(),
  setShowModalWindowStates: jest.fn(),
  enemyTypes: [],
  itemTypes: [],
  equipmentTypes: [],
  doorTypes: []
};

// prettier-ignore
const boardGameMockProps = {
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

const mockInitReduxState = {
  generalReducer: GLOBALCONST.PRELOADED_STATE
};
mockInitReduxState.generalReducer.areaInfo.areaMap = boardGameMockProps.SAPareaInfo.areaMap;
mockInitReduxState.generalReducer.playerProgress.explorationProgress[25] = 'explored';

describe('<BoardCell />', () => {
  describe('Clicking a "fow" tile will change its status to "revealed"', () => {
    it('should pass step #1', () => {
      const wrapper = mount(<BoardCell {...boardCellMockProps} />);
      wrapper.simulate('click');
      expect(boardCellMockProps.updateTileStateHandler).toHaveBeenCalledWith(
        18,
        GLOBALCONST.TILE_STATE_REVEALED
      );

      wrapper.unmount();
    });

    it('should pass step #2', () => {
      const mockStore = configureStore();
      const store = mockStore(mockInitReduxState);
      const connectedBoardGameWrapper = mount(<BoardGame store={store} {...boardGameMockProps} />);

      // Recall, the BoardGame is wrapped with <Connnect(BoardGame) /> because it's
      // connected to the redux mock store. Hence, its the child instance of the boardGameWrapper
      // that needs to be spied on. Also we mount the component first, so we have to spy the
      // instance of the wrapper.
      const boardGameWrapper = connectedBoardGameWrapper.childAt(0);
      const spy = jest.spyOn(boardGameWrapper.instance(), 'updateTilesModeState');
      const spy2 = jest.spyOn(boardGameWrapper.instance(), 'thisFowTileCanBeRevealed');

      // simulate the behaviour
      boardGameWrapper.instance().updateTilesModeState(18, GLOBALCONST.TILE_STATE_REVEALED);
      // sanity check for the simulation #1
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      // sanity check for the simulation #2 - make sure the status of the start tile is `explored`
      expect(
        boardGameWrapper.prop('store').getState().generalReducer.playerProgress
          .explorationProgress[25]
      ).toEqual('explored');

      // the test
      expect(boardGameWrapper.instance().thisFowTileCanBeRevealed(18)).toEqual(true);
      expect(boardGameWrapper.prop('store').getActions()).toEqual([
        {
          type: 'REVEAL_A_TILE',
          payload: {
            newTileState: 'revealed',
            tileIdx: 18
          }
        }
      ]);

      spy.mockClear();
      spy2.mockClear();
      connectedBoardGameWrapper.unmount();
    });

    // Step 3 has been covered in /actions/__tests__/tile.test.js &  /reducers/__tests__/tile.test.js
  });

  describe('Clicking a "fow" tile will change its status to "revealed" - Alternative approach', () => {
    it('should pass step #1', () => {
      const mockStore = configureStore();
      const store = mockStore(mockInitReduxState);
      const connectedBoardGameWrapper = mount(<BoardGame store={store} {...boardGameMockProps} />);

      const boardGameWrapper = connectedBoardGameWrapper.childAt(0);
      const boardTileComponent = boardGameWrapper
        .find('.ingame-board-container')
        .find('.row')
        .childAt(18);

      // sanity check for the simulation #1
      expect(boardTileComponent.render().hasClass('board-tile-fow-mode')).toEqual(true);
      // sanity check for the simulation #2 - make sure the status of the start tile is `explored`
      expect(
        boardGameWrapper.prop('store').getState().generalReducer.playerProgress
          .explorationProgress[25]
      ).toEqual('explored');

      // simulate the behaviour
      boardTileComponent.find('div.board-tile-fow-mode').simulate('click');

      // test case #1
      // NOTE: you don't need to spy this function with jest.spyOn. In fact, it's not possible to use
      // spyOn in mount because currently only shallow rendering supports event propagation.
      expect(boardGameWrapper.instance().thisFowTileCanBeRevealed(18)).toEqual(true);
      // test case #2
      expect(boardGameWrapper.prop('store').getActions()).toEqual([
        {
          type: 'REVEAL_A_TILE',
          payload: {
            newTileState: 'revealed',
            tileIdx: 18
          }
        }
      ]);

      connectedBoardGameWrapper.unmount();
    });

    // Step 2 has been covered in /actions/__tests__/tile.test.js &  /reducers/__tests__/tile.test.js
  });
});
