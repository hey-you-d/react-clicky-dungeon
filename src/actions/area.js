//import fetch from 'cross-fetch';

import { GLOBALCONST } from '../AppContext';

import { markATileAsExplored } from './tile';

export const START_AREA = 'START_AREA';

const receiveAreaData = (json, mode) => {
  return {
    type: START_AREA,
    payload: { areaInfo: json.area, mode }
  };
};

// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
const handleFetchErrors = response => {
  console.log(response);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export const getNextArea = (nextAreaId, mode = GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT) => {
  return (dispatch, getState) => {
    // API Call - GET request, return a Promise object
    return fetch(`${[process.env.PUBLIC_URL, '/sampledata/', nextAreaId].join('')}.json`, {
      credentials: 'same-origin'
    })
      .then(handleFetchErrors)
      .then(response => response.json())
      .then(resJson => {
        // update the state
        dispatch(receiveAreaData(resJson, mode));
        // get the current areaId from the redux state
        const { currentAreaId } = getState().generalReducer.areaInfo;

        if (currentAreaId !== GLOBALCONST.EPOCH_AREA_ID) {
          // its the start of a level, then get the index of the "START" tile
          for (let r = 0; r < resJson.area.areaMap.length; r += 1) {
            const j = resJson.area.areaMap[r];
            for (let c = 0; c < j.length; c += 1) {
              if (j[c] === GLOBALCONST.AREA_MAP_START_TILE_ID) {
                // finally, mark the "START" tile as "explored"
                // NOTE: 2D array idx to 1D array idx conversion :
                // e.g array of 36 elements (2D_array[5][5] => 1D_array[35]) : 5 + 5 + 5 * (6 - 1) = 35
                dispatch(markATileAsExplored(r + c + r * (GLOBALCONST.BOARD_GAME_ROW_NUM - 1)));

                break;
              }
            }
          }
        }
      })
      .catch(error => {
        if (error.toString() === 'SyntaxError: Unexpected token < in JSON at position 0') {
          const areaNotFound = {
            area: {
              id: GLOBALCONST.AREA_NOT_FOUND_ID,
              nextAreaId: '1-0',
              areaMap: [],
              areaEnemies: [],
              areaItems: [],
              areaEquipments: [],
              areaDoors: []
            }
          };
          dispatch(receiveAreaData(areaNotFound, GLOBALCONST.GET_NEXTAREA_MODE.RESTART_GAME));
        }
      });
  };
};
