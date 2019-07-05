import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { registerInitialStoreState, registerMiddlewares } from 'redux-actions-assertions';
import { registerAssertions } from 'redux-actions-assertions/jest';
//import fetch from 'cross-fetch';

import { GLOBALCONST } from '../../AppContext';

import { START_AREA, getNextArea } from '../area';

// prettier-ignore
const expectedPayload = {
  id: '1-0',
  nextAreaId: '1-1',
  areaMap: [
    ["A-2", "S-2", "W-2", "I-3", "I-2", "X"],
    ["X", "E-1-3", "I-1", "X", "EXIT", "X"],
    ["X", "X", "E-1-1", "X", "I-4", "I-2"],
    ["A-1", "W-1", "S-1", "I-1", "E-1-1", "X"],
    ["X", "START", "X", "X", "E-2-1", "X"],
    ["I-4", "X", "X", "I-4", "X", "X"]
  ],
  areaEnemies: [
    {
      id: 'E-1-1',
      name: 'Rogue Alien Ensign',
      img: 'si-glyph-alien.svg',
      level: 1,
      HP: 30,
      attackRange: [3, 5],
      lootOptions: ['I-1', 'I-2', 'I-3'],
      gainedExp: [25, 30, 35]
    },
    {
      id: 'E-1-3',
      name: 'Rogue Alien Captain',
      img: 'si-glyph-alien.svg',
      level: 5,
      HP: 130,
      attackRange: [10, 15],
      lootOptions: ['A-2', 'W-2', 'S-2'],
      gainedExp: [50, 55]
    },
    {
      id: 'E-2-1',
      name: 'Alien Warbeast',
      img: 'si-glyph-horse.svg',
      level: 1,
      HP: 20,
      attackRange: [4, 7],
      lootOptions: ['I-1', 'I-3'],
      gainedExp: [25, 30]
    }
  ],
  areaItems: [
    {
      id: 'I-1',
      name: 'Small Health Kit',
      img: 'si-glyph-heart-plus.svg',
      point: [30]
    },
    {
      id: 'I-2',
      name: 'Small Mana Booster',
      img: 'si-glyph-star-stick.svg',
      point: [15]
    },
    {
      id: 'I-3',
      name: 'Junior Burger',
      img: 'si-glyph-hamburger.svg',
      point: [30]
    },
    {
      id: 'I-4',
      name: 'Coins',
      img: 'si-glyph-money-coin.svg',
      point: [10, 15, 30, 100]
    }
  ],
  areaEquipments: [
    {
      id: 'W-1',
      type: 'weapon',
      name: 'ATK +10',
      img: 'si-glyph-knife.svg',
      point: [10]
    },
    {
      id: 'S-1',
      type: 'shield',
      name: 'DEF +10',
      img: 'si-glyph-shield.svg',
      point: [10]
    },
    {
      id: 'A-1',
      type: 'armour',
      name: 'HP +10',
      img: 'si-glyph-t-shirt.svg',
      point: [10]
    },
    {
      id: 'W-2',
      type: 'weapon',
      name: 'ATK +20',
      img: 'si-glyph-knife.svg',
      point: [20]
    },
    {
      id: 'S-2',
      type: 'shield',
      name: 'DEF +20',
      img: 'si-glyph-shield.svg',
      point: [20]
    },
    {
      id: 'A-2',
      type: 'armour',
      name: 'HP +20',
      img: 'si-glyph-t-shirt.svg',
      point: [20]
    }
  ],
  areaDoors: [
    {
      id: 'START',
      img: 'si-glyph-pin-location.svg'
    },
    {
      id: 'EXIT',
      img: 'si-glyph-downstair.svg'
    }
  ]
};

describe('getNextArea action creator - w/ redux-mock-store', () => {
  let middlewares;
  let mockStore;
  let store;
  let spy;
  let expectedJson;

  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
    store = mockStore(GLOBALCONST.PRELOADED_STATE);
    expectedJson = {
      area: expectedPayload
    };
    spy = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => expectedJson
      })
    );
  });

  afterEach(() => {
    spy.mockClear();
  });

  test('calls request & success actions if the fetch response was successful #1 - async await', async () => {
    await store.dispatch(getNextArea('1-0', GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT), () => {});

    // sanity check
    expect(spy).toHaveBeenCalledTimes(1);

    // the test
    expect(store.getActions().length).toBe(1);
    expect(store.getActions()).toContainEqual({
      type: START_AREA,
      payload: { areaInfo: expectedPayload, mode: GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT }
    });
  });

  // Ref: https://medium.com/@ferrannp/unit-testing-with-jest-redux-async-actions-fetch-9054ca28cdcd
  test('calls request & success actions if the fetch response was successful #1 - w/ Promise', () => {
    const promisedObj = store
      .dispatch(getNextArea('1-0', GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT))
      .then(() => {
        const expectedActions = store.getActions();

        // the test
        expect(expectedActions.length).toBe(1);
        expect(expectedActions).toContainEqual({
          type: START_AREA,
          payload: {
            areaInfo: expectedPayload,
            mode: GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT
          }
        });
      });

    // sanity check
    expect(spy).toHaveBeenCalledTimes(1);

    return promisedObj;
  });
});

// TODO
xdescribe('getNextArea action creator - w/ redux-actions-assertions', () => {
  beforeEach(registerAssertions);

  test('calls request & success actions if the fetch response was successful', () => {
    registerMiddlewares([thunk]);
    registerInitialStoreState(() => {
      return GLOBALCONST.PRELOADED_STATE;
    });
    // the test
    const currentReduxState = { currentAreaId: '1-0' };
    const expectedActions = [
      {
        type: START_AREA,
        payload: {
          areaInfo: expectedPayload,
          mode: GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT
        }
      }
    ];
    expect(getNextArea('1-0', GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT)).toDispatchActions(
      expectedActions
    );
    expect(getNextArea('1-0', GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT)).toDispatchActionsWithState(
      currentReduxState,
      expectedActions
    );
  });
});
