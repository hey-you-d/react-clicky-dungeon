// Haven't figured out how to test a 3rd party api fetch library, so let's just use the
// default js fetch.
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
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export const getNextArea = (nextAreaId, mode = GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT) => {
  return (dispatch, getState) => {
    // API Call - GET request, return a Promise object
    return fetch(`${[GLOBALCONST.API_ENDPOINT, 'areaInfo?p=', '1-0'].join('')}`, {
      mode: 'cors',
      credentials: 'omit'
    })
      .then(handleFetchErrors)
      .then(response => response.json())
      .then(resJson => {
        if (resJson.code === 200) {
          const jsonPayload = resJson;
          // convert the areaMap property of resJson.area from a string into an array
          const areaMapArray = JSON.parse(resJson.area.areaMap);
          // areaEnemiesArray is an array of JSON objects
          // resJson.area.areaEnemies[i].hp => areaEnemiesMember.HP
          // resJson.area.areaEnemies[i].gained_exp => areaEnemiesMember.gainedExp w/ the right format
          // resJson.area.areaEnemies[i].loot_options => areaEnemiesMember.lootOptions w/ the right format
          const areaEnemiesArray = [];
          for (let i = 0; i < resJson.area.areaEnemies.length; i += 1) {
            const areaEnemiesMember = {};
            areaEnemiesMember.id = resJson.area.areaEnemies[i].id;
            areaEnemiesMember.name = resJson.area.areaEnemies[i].name;
            areaEnemiesMember.img = resJson.area.areaEnemies[i].img;
            areaEnemiesMember.level = resJson.area.areaEnemies[i].level;
            areaEnemiesMember.HP = resJson.area.areaEnemies[i].hp;
            areaEnemiesMember.gainedExp = JSON.parse(resJson.area.areaEnemies[i].gained_exp);
            areaEnemiesMember.attackRange = JSON.parse(
              resJson.area.areaEnemies[i].attack_range
            ).map(x => parseInt(x, 10));
            areaEnemiesMember.lootOptions = JSON.parse(resJson.area.areaEnemies[i].loot_options);
            areaEnemiesArray.push(areaEnemiesMember);
          }
          // resJson.area.areaItems[i].points (plural) to areaItemsArray[i].point (singular)
          // with the right format
          const areaItemsArray = resJson.area.areaItems;
          for (let i = 0; i < areaItemsArray.length; i += 1) {
            const thisAreaItems = resJson.area.areaItems[i];
            areaItemsArray[i].point = JSON.parse(thisAreaItems.points);
          }
          // resJson.area.areaEquipments[i].points (plural) to areaEquipmentArray[i].point (singular)
          // with the right format
          const areaEquipmentArray = resJson.area.areaEquipments;
          for (let i = 0; i < areaEquipmentArray.length; i += 1) {
            const thisAreaEquipment = resJson.area.areaEquipments[i];
            areaEquipmentArray[i].point = JSON.parse(thisAreaEquipment.points);
          }
          jsonPayload.area.areaMap = areaMapArray;
          jsonPayload.area.areaEnemies = areaEnemiesArray;
          jsonPayload.area.areaItems = areaItemsArray;
          jsonPayload.area.areaEquipment = areaEquipmentArray;

          // update the state
          dispatch(receiveAreaData(jsonPayload, mode));
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
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error.toString());
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
      });
  };
};

export const getNextAreaFromSampleData = (
  nextAreaId,
  mode = GLOBALCONST.GET_NEXTAREA_MODE.DEFAULT
) => {
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
