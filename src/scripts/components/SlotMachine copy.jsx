import React, { Component, PropTypes } from 'react';

import SlotReel from 'components/SlotReel';
import SlotRuler from 'components/SlotRuler';
import { SPIN_DELAY, SPIN_EACH_STOP_DELAY } from 'constants/SlotConstants';
import { PAY_TYPES, LINE_TYPES } from 'constants/PayTableConstants';

let lines = {
  [LINE_TYPES.TOP.value]: [],
  [LINE_TYPES.CENTER.value]: [],
  [LINE_TYPES.BOTTOM.value]: [],
};

let colsFixed = true;

const arrayContainsArray = (superset, subset) => {
  const a = subset.every((value) => {
    return (superset.indexOf(value) >= 0);
  });
  const b = superset.every((value) => {
    return (subset.indexOf(value) >= 0);
  });
  return a && b;
};
const arrayContainsAny = (superset, subset) => {
  return superset.every((value) => {
    return (subset.indexOf(value) >= 0);
  });
};

class SlotMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerLines: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSpinning) {
      // spin Start event here.
      this.setState({ winnerLines: [] });
    }
  }

  handleSpinStop(reelState) {
    lines[LINE_TYPES.TOP.value].push(reelState.top);
    lines[LINE_TYPES.CENTER.value].push(reelState.center);
    lines[LINE_TYPES.BOTTOM.value].push(reelState.bottom);
    colsFixed = colsFixed && reelState.topFixed;
  }

  allSpinsStopped() {
    this.props.allSpinsStopped();
  }

  /* Checks win situation
   * Must call after the last SlotReel
   * Annoying conditional statements...
  */
  checkPlayerWon = (reelState) => {
    this.handleSpinStop(reelState);
    this.allSpinsStopped();

    const wins = [];
    if (colsFixed) {
      PAY_TYPES.map((type) => {
        if (type.LINE.value >= 0) { // NOT ANY
          if ((lines[type.LINE.value].toString() === type.SYMBOLS.toString())) {
            wins.push({
              ...type,
              winLine: type.LINE.value
            });
          }
        } else if (!type.COMBINATION) { // ANY
          switch (type.SYMBOLS.toString()) { // eslint-disable-line default-case
            case lines[LINE_TYPES.TOP.value].toString():
              wins.push({
                ...type,
                winLine: LINE_TYPES.TOP.value
              });
              break;
            case lines[LINE_TYPES.CENTER.value].toString():
              wins.push({
                ...type,
                winLine: LINE_TYPES.CENTER.value
              });
              break;
            case lines[LINE_TYPES.BOTTOM.value].toString():
              wins.push({
                ...type,
                winLine: LINE_TYPES.BOTTOM.value
              });
              break;
          }
        } else if (type.COMBINATION) {
          if (arrayContainsArray(lines[LINE_TYPES.TOP.value], type.SYMBOLS)) {
            wins.push({
              ...type,
              winLine: LINE_TYPES.TOP.value
            });
          } else if (arrayContainsArray(lines[LINE_TYPES.CENTER.value], type.SYMBOLS)) {
            wins.push({
              ...type,
              winLine: LINE_TYPES.CENTER.value
            });
          } else if (arrayContainsArray(lines[LINE_TYPES.BOTTOM.value], type.SYMBOLS)) {
            wins.push({
              ...type,
              winLine: LINE_TYPES.BOTTOM.value
            });
          } else if (type.ISOR) {
            if (arrayContainsAny(lines[LINE_TYPES.TOP.value], type.SYMBOLS)) {
              wins.push({
                ...type,
                winLine: LINE_TYPES.TOP.value
              });
            } else if (arrayContainsAny(lines[LINE_TYPES.CENTER.value], type.SYMBOLS)) {
              wins.push({
                ...type,
                winLine: LINE_TYPES.CENTER.value
              });
            } else if (arrayContainsAny(lines[LINE_TYPES.BOTTOM.value], type.SYMBOLS)) {
              wins.push({
                ...type,
                winLine: LINE_TYPES.BOTTOM.value
              });
            }
          }
        }
        return type;
      });
    }

    this.setState({ winnerLines: wins });
    this.props.updateWinners(wins);

    lines = {
      [LINE_TYPES.TOP.value]: [],
      [LINE_TYPES.CENTER.value]: [],
      [LINE_TYPES.BOTTOM.value]: [],
    };
    colsFixed = true;
  }

  render() {
    return (
      <div className="slot-machine">
        <SlotRuler />
        <SlotReel
          isSpinning={this.props.isSpinning}
          spinDelay={SPIN_DELAY}
          onSpinStop={this.handleSpinStop}
          winnerLines={this.state.winnerLines}
          isDebug={this.props.isDebug}
          debugPosition={this.props.debugPosition.reel1}
        />
        <SlotReel
          isSpinning={this.props.isSpinning}
          spinDelay={SPIN_DELAY + SPIN_EACH_STOP_DELAY}
          onSpinStop={this.handleSpinStop}
          winnerLines={this.state.winnerLines}
          isDebug={this.props.isDebug}
          debugPosition={this.props.debugPosition.reel2}
        />
        <SlotReel
          isSpinning={this.props.isSpinning}
          spinDelay={SPIN_DELAY + (SPIN_EACH_STOP_DELAY * 2)}
          onSpinStop={this.checkPlayerWon}
          winnerLines={this.state.winnerLines}
          isDebug={this.props.isDebug}
          debugPosition={this.props.debugPosition.reel3}
        />
      </div>
    );
  }
}

SlotMachine.propTypes = {
  isSpinning: PropTypes.bool.isRequired,
  allSpinsStopped: PropTypes.func.isRequired,
  updateWinners: PropTypes.func.isRequired,
  isDebug: PropTypes.bool.isRequired,
  debugPosition: PropTypes.object.isRequired
};

export default SlotMachine;
