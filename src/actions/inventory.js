import { GLOBALCONST } from '../AppContext';

export const OBTAIN_COINS = 'OBTAIN_COINS';
export const OBTAIN_CONSUMABLE_ITEM = 'OBTAIN_CONSUMABLE_ITEM';
export const OBTAIN_EQUIPMENT = 'OBTAIN_EQUIPMENT_ITEM';
export const REMOVE_INVENTORY_CONSUMABLE_ITEM = 'REMOVE_INVENTORY_CONSUMABLE_ITEM';
export const REMOVE_INVENTORY_EQUIPMENT_ITEM = 'REMOVE_INVENTORY_EQUIPMENT_ITEM';
export const EXPAND_INVENTORY = 'EXPAND_INVENTORY';
export const INVENTORY_ACTION_ERROR = 'INVENTORY_ACTION_ERROR';

export const obtainAnItem = (item, itemType, coinValue = 0) => {
  let dispatchedAction = {};

  switch (itemType) {
    case GLOBALCONST.ITEM_TYPE_COINS:
      dispatchedAction = {
        type: OBTAIN_COINS,
        payload: { itemValue: coinValue }
      };
      break;
    case GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM:
      dispatchedAction = {
        type: OBTAIN_CONSUMABLE_ITEM,
        payload: { item, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
      };
      break;
    case GLOBALCONST.ITEM_TYPE_EQUIPMENT:
      dispatchedAction = {
        type: OBTAIN_EQUIPMENT,
        payload: { item, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
      };
      break;
    default:
      dispatchedAction = {
        type: INVENTORY_ACTION_ERROR,
        payload: {}
      };
  }

  return dispatchedAction;
};

export const removeInventoryItem = (slotIdx, itemType) => {
  let dispatchedAction = {};

  switch (itemType) {
    case GLOBALCONST.ITEM_TYPE_CONSUMABLE_ITEM:
      dispatchedAction = {
        type: REMOVE_INVENTORY_CONSUMABLE_ITEM,
        payload: { slotIdx, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
      };
      break;
    case GLOBALCONST.ITEM_TYPE_EQUIPMENT:
      dispatchedAction = {
        type: REMOVE_INVENTORY_EQUIPMENT_ITEM,
        payload: { slotIdx, emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT }
      };
      break;
    default:
      dispatchedAction = {
        type: INVENTORY_ACTION_ERROR,
        payload: {}
      };
  }

  return dispatchedAction;
};

export const expandInventory = () => {
  return {
    type: EXPAND_INVENTORY,
    payload: {
      numSlots: GLOBALCONST.NUM_OF_INVENTORY_SLOTS_PER_SET,
      emptySlotMarker: GLOBALCONST.INVENTORY_EMPTY_SLOT
    }
  };
};
