import { GLOBALCONST } from '../AppContext';

export const EQUIP_SWORD = 'EQUIP_SWORD';
export const EQUIP_SHIELD = 'EQUIP_SHIELD';
export const EQUIP_ARMOUR = 'EQUIP_ARMOUR';
export const SWAP_SWORD = 'SWAP_SWORD';
export const SWAP_SHIELD = 'SWAP_SHIELD';
export const SWAP_ARMOUR = 'SWAP_ARMOUR';
export const EQUIPMENT_ACTION_ERROR = 'EQUIPMENT_ACTION_ERROR';

export const equip = (type, action, equipment, slotIdx) => {
  switch (type) {
    case GLOBALCONST.EQUIPMENT_TYPE_SWORD:
      switch (action) {
        case GLOBALCONST.EQUIP_ACTION_DEFAULT:
          return {
            type: EQUIP_SWORD,
            payload: { equipment }
          };
        case GLOBALCONST.EQUIP_ACTION_SWAP:
          return {
            type: SWAP_SWORD,
            payload: { slotIdx, equipment }
          };
        default:
      }
      break;
    case GLOBALCONST.EQUIPMENT_TYPE_SHIELD:
      switch (action) {
        case GLOBALCONST.EQUIP_ACTION_DEFAULT:
          return {
            type: EQUIP_SHIELD,
            payload: { equipment }
          };
        case GLOBALCONST.EQUIP_ACTION_SWAP:
          return {
            type: SWAP_SHIELD,
            payload: { slotIdx, equipment }
          };
        default:
      }
      break;
    case GLOBALCONST.EQUIPMENT_TYPE_ARMOUR:
      switch (action) {
        case GLOBALCONST.EQUIP_ACTION_DEFAULT:
          return {
            type: EQUIP_ARMOUR,
            payload: { equipment }
          };
        case GLOBALCONST.EQUIP_ACTION_SWAP:
          return {
            type: SWAP_ARMOUR,
            payload: { slotIdx, equipment }
          };
        default:
      }
      break;
    default:
  }

  return {
    type: EQUIPMENT_ACTION_ERROR,
    payload: {}
  };
};
