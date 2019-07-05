import { GLOBALCONST } from '../AppContext';

export const GAIN_EXP = 'GAIN_EXP';
export const SET_VITAL_HP = 'SET_VITAL_HP';
export const SET_VITAL_MP = 'SET_VITAL_MP';
export const SET_VITAL_ST = 'SET_VITAL_STAMINA';
export const SET_ATTR_BASE_ATK = 'SET_BASE_ATK_ATTRIBUTE';
export const SET_ATTR_BASE_DEF = 'SET_BASE_DEF_ATTRIBUTE';
export const SET_ATTR_BASE_HP = 'SET_BASE_HP_ATTRIBUTE';
export const SET_ATTR_BASE_MP = 'SET_BASE_MP_ATTRIBUTE';
export const SET_ATTR_BASE_ST = 'SET_BASE_ST_ATTRIBUTE';
export const UPDATE_ATTR_LVLUP_PT = 'UPDATE_AVAILABLE_LEVEL_UP_POINT';
export const UPDATE_COIN_PURSE = 'UPDATE_COIN_PURSE';
export const CHARACTER_ACTION_ERROR = 'CHARACTER_ACTION_ERROR';

export const setVitalStat = (type, point) => {
  switch (type) {
    case GLOBALCONST.VITAL_STAT_HP:
      return {
        type: SET_VITAL_HP,
        payload: { point }
      };
    case GLOBALCONST.VITAL_STAT_MP:
      return {
        type: SET_VITAL_MP,
        payload: { point }
      };
    case GLOBALCONST.VITAL_STAT_ST:
      return {
        type: SET_VITAL_ST,
        payload: { point }
      };
    default:
      return {
        type: CHARACTER_ACTION_ERROR,
        payload: {}
      };
  }
};

export const setAttributePoint = (type, point) => {
  switch (type) {
    case GLOBALCONST.PLAYER_ATTRIBUTE_ATK:
      return {
        type: SET_ATTR_BASE_ATK,
        payload: { point }
      };
    case GLOBALCONST.PLAYER_ATTRIBUTE_DEF:
      return {
        type: SET_ATTR_BASE_DEF,
        payload: { point }
      };
    case GLOBALCONST.PLAYER_ATTRIBUTE_HP:
      return {
        type: SET_ATTR_BASE_HP,
        payload: { point }
      };
    case GLOBALCONST.PLAYER_ATTRIBUTE_MP:
      return {
        type: SET_ATTR_BASE_MP,
        payload: { point }
      };
    case GLOBALCONST.PLAYER_ATTRIBUTE_ST:
      return {
        type: SET_ATTR_BASE_ST,
        payload: { point }
      };
    case GLOBALCONST.PLAYER_ATTRIBUTE_LVLUP_PT:
      return {
        type: UPDATE_ATTR_LVLUP_PT,
        payload: { point }
      };
    default:
      return {
        type: CHARACTER_ACTION_ERROR,
        payload: {}
      };
  }
};

export const gainExp = point => {
  return {
    type: GAIN_EXP,
    payload: { point }
  };
};

export const updateCoinPurse = point => {
  return {
    type: UPDATE_COIN_PURSE,
    payload: { itemValue: point }
  };
};
