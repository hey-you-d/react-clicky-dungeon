/* *******************************************************************************************
 * global constants are defined in here as well.
 * *******************************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';

// https://github.com/benmosher/eslint-plugin-import/blob/v2.14.0/docs/rules/prefer-default-export.md
const AREA_ID = {
  EPOCH: '0-0',
  START: '1-0',
  NOT_FOUND: 'X-X'
};

const BOARD_TILE_X = 'X';

const INVENTORY_EMPTY_SLOT = {
  id: '',
  type: '',
  name: '',
  img: '',
  point: [0]
};

const SAP_ITEM_PROPTYPES = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  point: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

const SAP_ENEMY_PROPTYPES = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired,
  attackRange: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  lootOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  gainedExp: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

const SAP_DOOR_PROPTYPES = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

const SAP_VITAL_STAT_PROPTYPES = {
  remainingHP: PropTypes.number.isRequired,
  maxHP: PropTypes.number.isRequired,
  remainingMP: PropTypes.number.isRequired,
  maxMP: PropTypes.number.isRequired,
  remainingST: PropTypes.number.isRequired,
  maxST: PropTypes.number.isRequired
};

const BATTLE_PANE_INFO_PROPTYPES = {
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  HP: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  attackRange: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  lootOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tileIdx: PropTypes.number.isRequired
};

const renderCreditMsg = () => {
  const webTools = [
    {
      label: 'HTML 5',
      url: 'https://www.w3schools.com/html/html5_intro.asp',
      svg: 'svg-html5.svg',
      png: 'png-128x128-html.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'CSS 3',
      url: 'https://www.w3schools.com/css/default.asp',
      svg: 'svg-css.svg',
      png: 'png-128x128-css.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'ES 6',
      url: 'https://babeljs.io/',
      svg: 'svg-js.svg',
      png: 'png-128x128-js.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'PHP',
      url: 'https://www.w3schools.com/php/default.asp',
      svg: 'svg-php.svg',
      png: 'png-128x128-php.png',
      hidden: true,
      bgColor: 'white'
    },
    {
      label: 'MySQL',
      url: 'https://www.mysql.com/',
      svg: 'svg-mysql.svg',
      png: 'png-128x128-mysql.png',
      hidden: true,
      bgColor: 'white'
    },
    {
      label: 'React JS',
      url: 'https://reactjs.org/',
      svg: 'svg-react.svg',
      png: 'png-128x128-react.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'Redux',
      url: 'https://redux.org/',
      svg: 'svg-redux.svg',
      png: 'png-128x128-redux.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'Formik',
      url: 'https://jaredpalmer.com/formik/',
      svg: 'svg-formik-white.svg',
      png: 'png-128x128-formik.png',
      hidden: false,
      bgColor: 'black'
    },
    {
      label: 'Lumen Framework',
      url: 'https://lumen.laravel.com/',
      svg: 'svg-laravel.svg',
      png: 'png-128x128-laravel.png',
      hidden: true,
      bgColor: 'white'
    },
    {
      label: 'Bootstrap',
      url: 'https://getbootstrap.com/',
      svg: 'svg-bootstrap.svg',
      png: 'png-128x128-bootstrap.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'Sass',
      url: 'https://sass-lang.com/',
      svg: 'svg-sass.svg',
      png: 'png-128x128-sass.png',
      hidden: true,
      bgColor: 'white'
    },
    {
      label: 'GraphQL',
      url: 'https://graphql.org/',
      svg: 'svg-graphql.svg',
      png: 'png-128x128-graphql.png',
      hidden: true,
      bgColor: 'white'
    },
    {
      label: 'Apollo',
      url: 'https://www.apollographql.com/',
      svg: 'svg-apollo.svg',
      png: 'png-128x128-apollo.png',
      hidden: true,
      bgColor: 'white'
    },
    {
      label: 'Jest',
      url: 'https://jestjs.io/',
      svg: 'svg-jest.svg',
      png: 'png-128x128-jest.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'Enzyme',
      url: 'https://airbnb.io/enzyme/',
      svg: 'svg-enzyme.svg',
      png: 'png-128x128-enzyme.png',
      hidden: false,
      bgColor: 'white'
    },
    {
      label: 'ESLint - AirBnb config',
      url: 'https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb',
      svg: 'svg-airbnb.svg',
      png: 'png-128x128-airbnb.png',
      hidden: false,
      bgColor: 'white'
    }
  ];

  const iconsMarkup = [];
  webTools.forEach((val, idx) => {
    if (!val.hidden) {
      iconsMarkup.push(
        <div key={['icon-', idx].join('')} className="col-lg-4 col-4">
          <a href={val.url}>
            <object
              type="image/svg+xml"
              className={val.bgColor === 'black' ? 'creditIcon bgColour-black' : 'creditIcon'}
              data={require(`./img/${val.svg}`)}
              data-src={require(`./img/${val.svg}`)}
            >
              <img
                alt="No SVG support"
                src={require(`./img/${val.svg}`)}
                data-src={require(`./img/${val.png}`)}
              />
            </object>
            <div>{val.label}</div>
          </a>
        </div>
      );
    }
  });

  return (
    <div className="modalContentContainer modalCreditContainer">
      <div className="modalContent">
        <h3>Thanks for playing this web app demo!</h3>
        <p>
          {
            'This portfolio is made possible by utilising the following web dev spec,frameworks & libraries:'
          }
        </p>
        <hr />
        <div className="container creditContainer">
          <div className="row no-border">{iconsMarkup}</div>
        </div>
      </div>
    </div>
  );
};

export const GLOBALCONST = {
  EPOCH_AREA_ID: AREA_ID.EPOCH,
  START_GAME_AREA_ID: AREA_ID.START,
  AREA_NOT_FOUND_ID: AREA_ID.NOT_FOUND,
  BOARD_TILE_X,
  GET_NEXTAREA_MODE: {
    RESTART_GAME: 'restart_game',
    DEFAULT: 'default'
  },
  PRELOADED_STATE: {
    turn: 0,
    areaInfo: {
      currentAreaId: AREA_ID.EPOCH,
      nextAreaId: AREA_ID.START,
      areaMap: [
        [BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X],
        [BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X],
        [BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X],
        [BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X],
        [BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X],
        [BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X, BOARD_TILE_X]
      ],
      areaEnemies: [],
      areaItems: [],
      areaEquipments: [],
      areaDoors: []
    },
    playerProgress: {
      explorationProgress: new Array(36).fill('fow'),
      level: 1,
      tgtExp: 100,
      currentExp: 0,
      availableAttrPt: 0,
      baseAtk: 1,
      baseDef: 1
    },
    playerVitalStat: {
      remainingHP: 100,
      maxHP: 100,
      remainingMP: 100,
      maxMP: 100,
      remainingST: 100,
      maxST: 100
    },
    playerEquipment: {
      sword: INVENTORY_EMPTY_SLOT,
      shield: INVENTORY_EMPTY_SLOT,
      armour: INVENTORY_EMPTY_SLOT
    },
    playerInventory: {
      consumableItems: new Array(12).fill().map(() => INVENTORY_EMPTY_SLOT),
      equipments: new Array(12).fill().map(() => INVENTORY_EMPTY_SLOT)
    },
    money: 0
  },
  AREA_MAP_START_TILE_ID: 'START',
  AREA_MAP_EXIT_TILE_ID: 'EXIT',
  BOARD_GAME_ROW_NUM: 6,
  BOARD_GAME_COL_NUM: 6,
  ITEM_TYPE_COINS: 'Coins',
  ITEM_TYPE_CONSUMABLE_ITEM: 'Consumable Item',
  ITEM_TYPE_EQUIPMENT: 'Equipment',
  INVENTORY_EMPTY_SLOT,
  PREV: 'prev',
  NEXT: 'next',
  NUM_OF_INVENTORY_SLOTS_PER_SET: 12,
  TILE_STATE_REVEALED: 'revealed',
  TILE_STATE_EXPLORED: 'explored',
  VITAL_STAT_HP: 'HP',
  VITAL_STAT_MP: 'MP',
  VITAL_STAT_ST: 'ST',
  EQUIPMENT_TYPE_SWORD: 'sword',
  EQUIPMENT_TYPE_SHIELD: 'shield',
  EQUIPMENT_TYPE_ARMOUR: 'armour',
  EQUIP_ACTION_DEFAULT: 'equip_action_default',
  EQUIP_ACTION_SWAP: 'equip_action_swap',
  PLAYER_ATTRIBUTE_ATK: 'attr atk',
  PLAYER_ATTRIBUTE_DEF: 'attr def',
  PLAYER_ATTRIBUTE_HP: 'attr hp',
  PLAYER_ATTRIBUTE_MP: 'attr mp',
  PLAYER_ATTRIBUTE_ST: 'attr st',
  PLAYER_ATTRIBUTE_AVAIL_PT: 'attr avail pt',
  STAMINA_COST: 1,
  AVAIL_ATTR_POINT_PER_LEVEL: 3,
  LEVEL_UP_TGT_EXP_LIST: new Array(99).fill().map((x, idx) => (idx + 1) * 100),
  MODAL_WINDOW: {
    CONFIRMATION: 'modal window - 2 buttons',
    NOTIFICATION: 'modal window - 1 button',
    NONE: 'close modal window'
  },
  MODAL_WINDOW_CONTEXT: {
    WON_BATTLE: 'won battle - obtain or ignore loot',
    RUN_FROM_BATTLE: 'run away from battle - run or keep fighting?',
    TO_NEXT_AREA: 'exit door clicked - head down to next area?',
    GAME_OVER: 'gameover - reload save or restart game',
    CREDIT: 'modal window - showing game credit'
  },
  SAP_ITEM: SAP_ITEM_PROPTYPES,
  SAP_ENEMY: SAP_ENEMY_PROPTYPES,
  SAP_DOOR: SAP_DOOR_PROPTYPES,
  SAP_VITAL_STAT: SAP_VITAL_STAT_PROPTYPES,
  BATTLE_PANE_INFO: BATTLE_PANE_INFO_PROPTYPES,
  CREDIT_MSG: renderCreditMsg(),
  IMG_LAZY_LOADING_USE_DEFAULT_REF: { current: document.createElement('div') },
  CHECK_ACTION_PAYLOAD_OK: 'OK'
};

export const AppContext = React.createContext({ creditMsg: renderCreditMsg() });
