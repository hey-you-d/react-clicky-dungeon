import { GLOBALCONST } from '../AppContext';
import { checkReducerActionPayloadHelper } from '../Helper';

let nextEquipmentsState = [];

const getPayloadSanityCheckOutput1 = actionPayload => {
  const { equipment } = actionPayload;

  const returnCurrentStateConditions = [
    typeof equipment !== 'object',
    Object.prototype.hasOwnProperty.call(equipment, 'id') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'type') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'name') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'img') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'point') === false,
    equipment === {},
    typeof equipment.id !== 'string',
    equipment.id === '',
    typeof equipment.type !== 'string',
    equipment.type === '',
    typeof equipment.name !== 'string',
    equipment.name === '',
    typeof equipment.img !== 'string',
    equipment.img === '',
    typeof equipment.point !== 'object',
    !Array.isArray(equipment.point),
    equipment.point.length === 0
  ];

  return checkReducerActionPayloadHelper(actionPayload, returnCurrentStateConditions);
};

const getPayloadSanityCheckOutput2 = actionPayload => {
  const { slotIdx, equipment } = actionPayload;

  const returnCurrentStateConditions = [
    typeof slotIdx !== 'number',
    typeof equipment !== 'object',
    Object.prototype.hasOwnProperty.call(equipment, 'id') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'type') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'name') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'img') === false,
    Object.prototype.hasOwnProperty.call(equipment, 'point') === false,
    slotIdx < 0,
    equipment === {},
    typeof equipment.id !== 'string',
    equipment.id === '',
    typeof equipment.type !== 'string',
    equipment.type === '',
    typeof equipment.name !== 'string',
    equipment.name === '',
    typeof equipment.img !== 'string',
    equipment.img === '',
    typeof equipment.point !== 'object',
    !Array.isArray(equipment.point),
    equipment.point.length === 0
  ];

  return checkReducerActionPayloadHelper(actionPayload, returnCurrentStateConditions);
};

export const equipSword = (currentState, actionPayload = { equipment: {} }) => {
  if (
    Object.prototype.hasOwnProperty.call(actionPayload, 'equipment') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload.equipment, 'point') === false ||
    getPayloadSanityCheckOutput1(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK
  ) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: {
      sword: actionPayload.equipment,
      shield: currentState.playerEquipment.shield,
      armour: currentState.playerEquipment.armour
    },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const equipShield = (currentState, actionPayload = { equipment: {} }) => {
  if (
    Object.prototype.hasOwnProperty.call(actionPayload, 'equipment') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload.equipment, 'point') === false ||
    getPayloadSanityCheckOutput1(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK
  ) {
    return currentState;
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: {
      sword: currentState.playerEquipment.sword,
      shield: actionPayload.equipment,
      armour: currentState.playerEquipment.armour
    },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const equipArmour = (currentState, actionPayload = { equipment: {} }) => {
  if (
    Object.prototype.hasOwnProperty.call(actionPayload, 'equipment') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload.equipment, 'point') === false ||
    getPayloadSanityCheckOutput1(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK
  ) {
    return currentState;
  }

  // wearing an armour will boost the max HP of the hero
  const { maxHP } = currentState.playerVitalStat;
  const maxHPModifierArray = actionPayload.equipment.point;

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: {
      remainingHP: currentState.playerVitalStat.remainingHP,
      maxHP: maxHP + maxHPModifierArray[0],
      remainingMP: currentState.playerVitalStat.remainingMP,
      maxMP: currentState.playerVitalStat.maxMP,
      remainingST: currentState.playerVitalStat.remainingST,
      maxST: currentState.playerVitalStat.maxST
    },
    playerEquipment: {
      sword: currentState.playerEquipment.sword,
      shield: currentState.playerEquipment.shield,
      armour: actionPayload.equipment
    },
    playerInventory: { ...currentState.playerInventory },
    money: currentState.money
  };
};

export const swapSword = (currentState, actionPayload = { slotIdx: -1, equipment: {} }) => {
  if (
    Object.prototype.hasOwnProperty.call(actionPayload, 'equipment') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload, 'slotIdx') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload.equipment, 'point') === false ||
    getPayloadSanityCheckOutput2(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK
  ) {
    return currentState;
  }

  nextEquipmentsState = [...currentState.playerInventory.equipments];
  for (let i = 0; i < nextEquipmentsState.length; i += 1) {
    if (i === actionPayload.slotIdx) {
      nextEquipmentsState[i] = currentState.playerEquipment.sword;
      break;
    }
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: {
      sword: actionPayload.equipment,
      shield: currentState.playerEquipment.shield,
      armour: currentState.playerEquipment.armour
    },
    playerInventory: {
      consumableItems: currentState.playerInventory.consumableItems,
      equipments: nextEquipmentsState
    },
    money: currentState.money
  };
};

export const swapShield = (currentState, actionPayload = { slotIdx: -1, equipment: {} }) => {
  if (
    Object.prototype.hasOwnProperty.call(actionPayload, 'equipment') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload, 'slotIdx') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload.equipment, 'point') === false ||
    getPayloadSanityCheckOutput2(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK
  ) {
    return currentState;
  }

  nextEquipmentsState = [...currentState.playerInventory.equipments];

  for (let i = 0; i < nextEquipmentsState.length; i += 1) {
    if (i === actionPayload.slotIdx) {
      nextEquipmentsState[i] = currentState.playerEquipment.shield;
      break;
    }
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: {
      sword: currentState.playerEquipment.sword,
      shield: actionPayload.equipment,
      armour: currentState.playerEquipment.armour
    },
    playerInventory: {
      consumableItems: currentState.playerInventory.consumableItems,
      equipments: nextEquipmentsState
    },
    money: currentState.money
  };
};

export const swapArmour = (currentState, actionPayload = { slotIdx: -1, equipment: {} }) => {
  if (
    Object.prototype.hasOwnProperty.call(actionPayload, 'equipment') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload, 'slotIdx') === false ||
    Object.prototype.hasOwnProperty.call(actionPayload.equipment, 'point') === false ||
    getPayloadSanityCheckOutput2(actionPayload) !== GLOBALCONST.CHECK_ACTION_PAYLOAD_OK
  ) {
    return currentState;
  }

  nextEquipmentsState = [...currentState.playerInventory.equipments];

  for (let i = 0; i < nextEquipmentsState.length; i += 1) {
    if (i === actionPayload.slotIdx) {
      nextEquipmentsState[i] = currentState.playerEquipment.armour;
      break;
    }
  }

  return {
    turn: currentState.turn,
    areaInfo: { ...currentState.areaInfo },
    playerProgress: { ...currentState.playerProgress },
    playerVitalStat: { ...currentState.playerVitalStat },
    playerEquipment: {
      sword: currentState.playerEquipment.sword,
      shield: currentState.playerEquipment.shield,
      armour: actionPayload.equipment
    },
    playerInventory: {
      consumableItems: currentState.playerInventory.consumableItems,
      equipments: nextEquipmentsState
    },
    money: currentState.money
  };
};
