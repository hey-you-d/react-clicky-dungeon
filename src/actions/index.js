/* eslint-disable prettier/prettier */

/* Synchronous action types & action creators
   governed by the user interaction. */
import * as tileActions from './tile';
import * as inventoryActions from './inventory';
import * as equipmentActions from './equipments';
import * as characterActions from './character';
import * as areaActions from './area';

export const {
  REVEAL_A_TILE, MARK_TILE_AS_EXPLORED,
  revealATile, markATileAsExplored
} = tileActions;

export const {
  OBTAIN_COINS, OBTAIN_CONSUMABLE_ITEM, OBTAIN_EQUIPMENT, INVENTORY_ACTION_ERROR,
  REMOVE_INVENTORY_CONSUMABLE_ITEM, REMOVE_INVENTORY_EQUIPMENT_ITEM, EXPAND_INVENTORY,
  obtainAnItem, removeInventoryItem, expandInventory
} = inventoryActions;

export const {
  EQUIP_SWORD, EQUIP_SHIELD, EQUIP_ARMOUR,
  SWAP_SWORD, SWAP_SHIELD, SWAP_ARMOUR,
  EQUIPMENT_ACTION_ERROR, equip 
} = equipmentActions;

export const {
  GAIN_EXP, SET_VITAL_HP, SET_VITAL_MP, SET_VITAL_ST, UPDATE_ATTR_LVLUP_PT, UPDATE_COIN_PURSE,
  SET_ATTR_BASE_ATK, SET_ATTR_BASE_DEF, SET_ATTR_BASE_HP, SET_ATTR_BASE_MP, SET_ATTR_BASE_ST,
  CHARACTER_ACTION_ERROR, setVitalStat, setAttributePoint, gainExp, updateCoinPurse
} = characterActions;

/* Synchronous action types & action creators
   governed by the network request. */
export const { START_AREA } = areaActions;

/* asynchronous action creators wrapped in redux-thunk midddleware */
export const { getNextArea } = areaActions;
