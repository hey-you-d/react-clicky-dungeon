import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { GLOBALCONST } from '../AppContext';
import ImageMarkup from './ImageMarkup';

import tshirt from '../svg/si-glyph-t-shirt.svg';
import knife from '../svg/si-glyph-knife.svg';
import shield from '../svg/si-glyph-shield.svg';

const Equipment = props => {
  const { SAPplayerEquipment } = props;
  const emptySlotStyle = ['equipment-slot-innerborder'];
  const occupiedSlotStyle = [...emptySlotStyle];
  occupiedSlotStyle.push('equipment-slot-innerborder-occupied');

  return (
    <div className="container ingame-equipmentpane-container">
      <div className="row no-gutters">
        <div className="col-4" />
        <div className="col-4">
          {isEqual(SAPplayerEquipment.armour, GLOBALCONST.INVENTORY_EMPTY_SLOT) ? (
            <div className="tstTagArmourLabel">[Armour]</div>
          ) : (
            <div className="tstTagArmourLabel">{SAPplayerEquipment.armour.name}</div>
          )}
          <div className="equipment-slot">
            <div
              className={
                isEqual(SAPplayerEquipment.armour, GLOBALCONST.INVENTORY_EMPTY_SLOT)
                  ? emptySlotStyle.join(' ')
                  : occupiedSlotStyle.join(' ')
              }
            >
              <ImageMarkup
                reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                alt="armour slot"
                classes=""
                src=""
                dataSrc={tshirt}
                dataSrcSet={tshirt}
                observeInDidUpdate={false}
              />
            </div>
          </div>
        </div>
        <div className="col-4" />
        <div className="col-4">
          {isEqual(SAPplayerEquipment.sword, GLOBALCONST.INVENTORY_EMPTY_SLOT) ? (
            <div className="tstTagSwordLabel">[Sword]</div>
          ) : (
            <div className="tstTagSwordLabel">{SAPplayerEquipment.sword.name}</div>
          )}
          <div className="equipment-slot">
            <div
              className={
                isEqual(SAPplayerEquipment.sword, GLOBALCONST.INVENTORY_EMPTY_SLOT)
                  ? emptySlotStyle.join(' ')
                  : occupiedSlotStyle.join(' ')
              }
            >
              <ImageMarkup
                reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                alt="sword slot"
                classes=""
                src=""
                dataSrc={knife}
                dataSrcSet={knife}
                observeInDidUpdate={false}
              />
            </div>
          </div>
        </div>
        <div className="col-4" />
        <div className="col-4">
          {isEqual(SAPplayerEquipment.shield, GLOBALCONST.INVENTORY_EMPTY_SLOT) ? (
            <div className="tstTagShieldLabel">[Shield]</div>
          ) : (
            <div className="tstTagShieldLabel">{SAPplayerEquipment.shield.name}</div>
          )}
          <div className="equipment-slot">
            <div
              className={
                isEqual(SAPplayerEquipment.shield, GLOBALCONST.INVENTORY_EMPTY_SLOT)
                  ? emptySlotStyle.join(' ')
                  : occupiedSlotStyle.join(' ')
              }
            >
              <ImageMarkup
                reference={GLOBALCONST.IMG_LAZY_LOADING_USE_DEFAULT_REF}
                alt="shield slot"
                classes=""
                src=""
                dataSrc={shield}
                dataSrcSet={shield}
                observeInDidUpdate={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Equipment.propTypes = {
  SAPplayerEquipment: PropTypes.shape(
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired,
    PropTypes.shape(GLOBALCONST.SAP_ITEM).isRequired
  ).isRequired
};

export default Equipment;
