// with the 'magical' createReducer function from redux-starter-kit, you can write reducers that
// appear to "mutate" state, but the updates are actually applied immutably.
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns

// TODO - Splitting reducers :
// https://redux.js.org/recipes/structuring-reducers/using-combinereducers#baseDefining

import { combineReducers } from 'redux';

import {
  START_AREA,
  EXPAND_INVENTORY,
  REVEAL_A_TILE,
  MARK_TILE_AS_EXPLORED,
  OBTAIN_COINS,
  OBTAIN_CONSUMABLE_ITEM,
  OBTAIN_EQUIPMENT,
  REMOVE_INVENTORY_CONSUMABLE_ITEM,
  REMOVE_INVENTORY_EQUIPMENT_ITEM,
  INVENTORY_ACTION_ERROR,
  SET_VITAL_HP,
  SET_VITAL_MP,
  SET_VITAL_ST,
  CHARACTER_ACTION_ERROR,
  GAIN_EXP,
  UPDATE_ATTR_LVLUP_PT,
  SET_ATTR_BASE_ATK,
  SET_ATTR_BASE_DEF,
  SET_ATTR_BASE_HP,
  SET_ATTR_BASE_MP,
  SET_ATTR_BASE_ST,
  EQUIP_SWORD,
  EQUIP_SHIELD,
  EQUIP_ARMOUR,
  SWAP_SWORD,
  SWAP_SHIELD,
  SWAP_ARMOUR,
  EQUIPMENT_ACTION_ERROR,
  UPDATE_COIN_PURSE
} from '../actions';

import startArea from './area';
import updateTileState from './tile';
import * as characterReducer from './character';
import * as itemReducer from './item';
import * as inventoryReducer from './inventory';
import * as vitalReducer from './vital';
import * as equipmentReducer from './equipment';

/* the initial state is declared in container/root.js so that it can passed to
 * configureStore, and then pass it through mapStateToProps to container
 * components.
 */
const generalReducer = (state = {}, action) => {
  if (action === undefined) {
    return state;
  }

  switch (action.type) {
    case START_AREA:
      return startArea(state, action.payload);
    case REVEAL_A_TILE:
    case MARK_TILE_AS_EXPLORED:
      return updateTileState(state, action.payload);
    case UPDATE_COIN_PURSE:
      return itemReducer.obtainCoin(state, action.payload);
    case OBTAIN_COINS:
      return action.type === INVENTORY_ACTION_ERROR
        ? state
        : itemReducer.obtainCoin(state, action.payload);
    case OBTAIN_CONSUMABLE_ITEM:
      return action.type === INVENTORY_ACTION_ERROR
        ? state
        : itemReducer.obtainConsumableItem(state, action.payload);
    case OBTAIN_EQUIPMENT:
      return action.type === INVENTORY_ACTION_ERROR
        ? state
        : itemReducer.obtainEquipment(state, action.payload);
    case REMOVE_INVENTORY_EQUIPMENT_ITEM:
      return action.type === INVENTORY_ACTION_ERROR
        ? state
        : inventoryReducer.removeEquipmentItem(state, action.payload);
    case REMOVE_INVENTORY_CONSUMABLE_ITEM:
      return action.type === INVENTORY_ACTION_ERROR
        ? state
        : inventoryReducer.removeConsumableItem(state, action.payload);
    case GAIN_EXP:
      return characterReducer.gainExp(state, action.payload);
    case UPDATE_ATTR_LVLUP_PT:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : characterReducer.updateLvUpPoint(state, action.payload);
    case SET_ATTR_BASE_ATK:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : characterReducer.setBaseAtkAttr(state, action.payload);
    case SET_ATTR_BASE_DEF:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : characterReducer.setBaseDefAttr(state, action.payload);
    case SET_ATTR_BASE_HP:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : characterReducer.setBaseHPAttr(state, action.payload);
    case SET_ATTR_BASE_MP:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : characterReducer.setBaseMPAttr(state, action.payload);
    case SET_ATTR_BASE_ST:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : characterReducer.setBaseSTAttr(state, action.payload);
    case SET_VITAL_HP:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : vitalReducer.setHP(state, action.payload);
    case SET_VITAL_MP:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : vitalReducer.setMP(state, action.payload);
    case SET_VITAL_ST:
      return action.type === CHARACTER_ACTION_ERROR
        ? state
        : vitalReducer.setST(state, action.payload);
    case EQUIP_SWORD:
      return action.type === EQUIPMENT_ACTION_ERROR
        ? state
        : equipmentReducer.equipSword(state, action.payload);
    case EQUIP_SHIELD:
      return action.type === EQUIPMENT_ACTION_ERROR
        ? state
        : equipmentReducer.equipShield(state, action.payload);
    case EQUIP_ARMOUR:
      return action.type === EQUIPMENT_ACTION_ERROR
        ? state
        : equipmentReducer.equipArmour(state, action.payload);
    case SWAP_SWORD:
      return action.type === EQUIPMENT_ACTION_ERROR
        ? state
        : equipmentReducer.swapSword(state, action.payload);
    case SWAP_SHIELD:
      return action.type === EQUIPMENT_ACTION_ERROR
        ? state
        : equipmentReducer.swapShield(state, action.payload);
    case SWAP_ARMOUR:
      return action.type === EQUIPMENT_ACTION_ERROR
        ? state
        : equipmentReducer.swapArmour(state, action.payload);
    case EXPAND_INVENTORY:
      return inventoryReducer.expandInventory(state, action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  generalReducer
});

export default rootReducer;
