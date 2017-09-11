import React, { Component, PropTypes } from 'react';

import SlotReel from 'components/SlotReel';
import SlotRuler from 'components/SlotRuler';
import { SPIN_DELAY, SPIN_EACH_STOP_DELAY } from 'constants/SlotConstants';
import { PAY_TYPES, LINE_TYPES } from 'constants/PayTableConstants';

let lines = [
  [], // TOP
  [], // CENTER
  [], // BOTTOM, if you want add more lines, edit that array
];

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
      lines.map((line, index) => {
        PAY_TYPES.map((type) => {
          if (!line.added) {
            if (type.LINE.value >= 0) { // exactly same line
              if ((line.toString() === type.SYMBOLS.toString()) && type.LINE.value === index) {
                wins.push({
                  ...type,
                  winLine: { ...line, lineNumber: index }
                });
                line.added = true; // eslint-disable-line no-param-reassign
              }
            } else if (!type.COMBINATION) {
              if ((line.toString() === type.SYMBOLS.toString()) && type.LINE.value < 0) { // equals
                wins.push({
                  ...type,
                  winLine: { ...line, lineNumber: index }
                });
                line.added = true; // eslint-disable-line no-param-reassign
              }
            } else if (type.COMBINATION) { // any line
              if (arrayContainsArray(line, type.SYMBOLS)) {
                wins.push({
                  ...type,
                  winLine: { ...line, lineNumber: index }
                });
                line.added = true; // eslint-disable-line no-param-reassign
              } else if (type.ISOR) { //
                if (arrayContainsAny(line, type.SYMBOLS)) {
                  wins.push({
                    ...type,
                    winLine: { ...line, lineNumber: index }
                  });
                  line.added = true; // eslint-disable-line no-param-reassign
                }
              }
            }
          }
          return type;
        });
        return line;
      });
    }

    this.setState({ winnerLines: wins });
    console.log(wins);
    this.props.updateWinners(wins);

    lines = [ // RESET LINES
      [],
      [],
      [],
    ];
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
