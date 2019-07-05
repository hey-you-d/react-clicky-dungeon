import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BoardCell from '../components/BoardCell';

import { revealATile, markATileAsExplored, obtainAnItem } from '../actions';

import { GLOBALCONST } from '../AppContext';

const LOCALCONST = { TOTAL_TILES: 36 };

class BoardGame extends Component {
  constructor(props) {
    super(props);

    this.updateTilesModeState = this.updateTilesModeState.bind(this);
    this.obtainItemHandler = this.obtainItemHandler.bind(this);
  }

  updateTilesModeState(idx, newState) {
    const {
      DAPrevealATile,
      DAPmarkATileAsExplored,
      SAPvitalStat,
      setShowModalWindowStates
    } = this.props;

    if (SAPvitalStat.remainingST <= 0) {
      // if the player stamina has reached 0 or less, then its game over.
      const gameOverMsg = (
        <div className="modalContentContainer">
          <div className="modalContent">
            <h1>GAME OVER</h1>
          </div>
        </div>
      );

      setShowModalWindowStates(
        GLOBALCONST.MODAL_WINDOW.NOTIFICATION,
        GLOBALCONST.MODAL_WINDOW_CONTEXT.GAME_OVER,
        gameOverMsg,
        'Restart Game'
      );
    } else if (this.thisFowTileCanBeRevealed(idx)) {
      // otherwise its game over
      switch (newState) {
        case GLOBALCONST.TILE_STATE_REVEALED:
          DAPrevealATile(idx);
          break;
        case GLOBALCONST.TILE_STATE_EXPLORED:
          DAPmarkATileAsExplored(idx);
          break;
        default:
      }
    }
  }

  obtainItemHandler(item, itemType, coinValue = 0) {
    const { DAPobtainAnItem } = this.props;

    DAPobtainAnItem(item, itemType, coinValue);
  }

  thisFowTileCanBeRevealed(idx) {
    const { SAPexplorationProgress } = this.props;

    // check if any adjacent tiles of the target tile has been explored.
    // [ N, S, E, W, NE, NW, SE, SW ]
    const adjacentIdxs = [
      idx - 6,
      idx + 6,
      idx + 1,
      idx - 1,
      idx + 6 + 1,
      idx + 6 - 1,
      idx - 6 + 1,
      idx - 6 - 1
    ];
    const nonFowModes = [GLOBALCONST.TILE_STATE_REVEALED, GLOBALCONST.TILE_STATE_EXPLORED];

    for (let i = 0; i < adjacentIdxs.length; i += 1) {
      // a tile can be revealed if any of the adjacent tiles of target tile have been
      // opened / revealed.
      if (
        adjacentIdxs[i] >= 0 &&
        adjacentIdxs[i] <= LOCALCONST.TOTAL_TILES &&
        nonFowModes.includes(SAPexplorationProgress[adjacentIdxs[i]])
      ) {
        return true;
      }
    }
    return false;
  }

  renderBoardGame() {
    const {
      SAPareaInfo,
      SAPexplorationProgress,
      setShowBattlePaneStates,
      setShowModalWindowStates
    } = this.props;

    const table = [];

    for (let r = 0; r < SAPareaInfo.areaMap.length; r += 1) {
      const k = SAPareaInfo.areaMap[r];
      for (let c = 0; c < k.length; c += 1) {
        const props = {
          content: k[c],
          isStartTile: k[c] === GLOBALCONST.AREA_MAP_START_TILE_ID,
          thisTileIdx: r + c + r * (GLOBALCONST.BOARD_GAME_ROW_NUM - 1),
          tilesModeState: SAPexplorationProgress,
          updateTileStateHandler: this.updateTilesModeState,
          obtainItemHandler: this.obtainItemHandler,
          setShowBattlePaneStates,
          setShowModalWindowStates,
          enemyTypes: SAPareaInfo.areaEnemies,
          itemTypes: SAPareaInfo.areaItems,
          equipmentTypes: SAPareaInfo.areaEquipments,
          doorTypes: SAPareaInfo.areaDoors
        };

        table.push(<BoardCell key={[c, ' ', r].join('')} {...props} />);
      }
    }

    return table;
  }

  render() {
    return (
      <div className="container ingame-board-container">
        <div className="row">{this.renderBoardGame()}</div>
      </div>
    );
  }
}

BoardGame.propTypes = {
  DAPrevealATile: PropTypes.func.isRequired,
  DAPmarkATileAsExplored: PropTypes.func.isRequired,
  DAPobtainAnItem: PropTypes.func.isRequired,
  SAPvitalStat: PropTypes.shape(GLOBALCONST.SAP_VITAL_STAT).isRequired,
  SAPexplorationProgress: PropTypes.arrayOf(PropTypes.string).isRequired,
  SAPareaInfo: PropTypes.shape({
    currentAreaId: PropTypes.string.isRequired,
    nextAreaId: PropTypes.string.isRequired,
    areaMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired)
      .isRequired,
    areaEnemies: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ENEMY)),
    areaItems: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)),
    areaEquipments: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_ITEM)),
    areaDoors: PropTypes.arrayOf(PropTypes.shape(GLOBALCONST.SAP_DOOR))
  }).isRequired,
  setShowBattlePaneStates: PropTypes.func.isRequired,
  setShowModalWindowStates: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    SAPexplorationProgress: state.generalReducer.playerProgress.explorationProgress,
    SAPvitalStat: state.generalReducer.playerVitalStat
  };
}

// DAP -> Dispatch (action creator function) As Prop
function mapDispatchToProps(dispatch) {
  return {
    DAPrevealATile: tileIdx => dispatch(revealATile(tileIdx)),
    DAPmarkATileAsExplored: tileIdx => dispatch(markATileAsExplored(tileIdx)),
    DAPobtainAnItem: (item, itemType, coinValue) =>
      dispatch(obtainAnItem(item, itemType, coinValue))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardGame);
