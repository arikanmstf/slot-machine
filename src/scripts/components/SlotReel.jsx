import React, { Component, PropTypes } from 'react';

import SlotSymbol from 'components/SlotSymbol';
import { SLOT_SYMBOL_TYPES, TOP_FIXED_CHANCE } from 'constants/SlotConstants';

const NUMBER_OF_SYMBOLS = SLOT_SYMBOL_TYPES.length;
const angle = 360 / NUMBER_OF_SYMBOLS;

class SlotReel extends Component {
  constructor(props) {
    super(props);

    const randomPosition = this.generateRandomPosition();
    const marginTopTopRand = parseInt((Math.random() * 1000), 10);

    this.state = {
      upperTop: (randomPosition + 3) % NUMBER_OF_SYMBOLS, // upperTop and downerBottom invisible, no need to initialize for debug
      top: this.props.isDebug ? this.props.debugPosition.top : (randomPosition + 4) % NUMBER_OF_SYMBOLS,
      center: this.props.isDebug ? this.props.debugPosition.center : randomPosition % NUMBER_OF_SYMBOLS,
      bottom: this.props.isDebug ? this.props.debugPosition.bottom : (randomPosition + 1) % NUMBER_OF_SYMBOLS,
      downerBottom: (randomPosition + 2) % NUMBER_OF_SYMBOLS,
      topFixed: this.props.isDebug ? true : (marginTopTopRand % TOP_FIXED_CHANCE === 0),
      isSpinning: this.props.isSpinning,
      winnerLines: this.props.winnerLines,
      isDebug: this.props.isDebug,
      debugPosition: this.props.debugPosition
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSpinning) {
      const randomPosition = this.generateRandomPosition();
      const marginTopTopRand = parseInt((Math.random() * 1000), 10);

      this.setState({
        upperTop: (randomPosition + 3) % NUMBER_OF_SYMBOLS,
        top: nextProps.isDebug ? nextProps.debugPosition.top : (randomPosition + 4) % NUMBER_OF_SYMBOLS,
        center: nextProps.isDebug ? nextProps.debugPosition.center : randomPosition % NUMBER_OF_SYMBOLS,
        bottom: nextProps.isDebug ? nextProps.debugPosition.bottom : (randomPosition + 1) % NUMBER_OF_SYMBOLS,
        downerBottom: (randomPosition + 2) % NUMBER_OF_SYMBOLS,
        topFixed: nextProps.isDebug ? true : (marginTopTopRand % TOP_FIXED_CHANCE === 0),
        isSpinning: nextProps.isSpinning,
        winnerLines: nextProps.winnerLines,
        isDebug: nextProps.isDebug,
        debugPosition: nextProps.debugPosition
      });
      setTimeout(() => {
        this.setState({ isSpinning: false });
        this.props.onSpinStop(this.state);
      }, nextProps.spinDelay);
    } else {
      this.setState({ isSpinning: nextProps.isSpinning, winnerLines: nextProps.winnerLines });
    }
  }

  /* reference for spinning css: https://stackoverflow.com/a/7540459/5669415 */
  setupTransform(row) {
    return this.state.isSpinning ? 'rotateX(' + (angle * row) + 'deg) translateZ(150px)' : 'none'; // eslint-disable-line prefer-template
  }

  getDebugPosition = (index) => {
    return this.state.debugPosition[index];
  }

  generateRandomPosition = () => (parseInt((Math.random() * 1000), 10) % NUMBER_OF_SYMBOLS);

  isLineWinner = (lineNumber) => {
    let winner = false;
    this.state.winnerLines.map((line) => {
      if (line.winLine.lineNumber === lineNumber) winner = true;
      return line;
    });
    return winner;
  };

  render() {
    return (
      <div className="slot-reel">
        <div
          className={this.state.isSpinning ? `spin` : 'stopped'}
          style={{ marginTop: this.state.topFixed ? '0px' : null }}
        >
          { this.state.isSpinning ? <SlotSymbol
            type={SLOT_SYMBOL_TYPES[this.state.upperTop]}
            style={{ transform: this.setupTransform(1) }}
            className={this.isLineWinner(0) ? 'winner' : ''}
          /> : null }
          <SlotSymbol
            type={SLOT_SYMBOL_TYPES[this.state.top]}
            style={{ transform: this.setupTransform(2) }}
            className={this.isLineWinner(0) ? 'winner' : ''}
          />
          <SlotSymbol
            type={SLOT_SYMBOL_TYPES[this.state.center]}
            style={{ transform: this.setupTransform(3) }}
            className={this.isLineWinner(1) ? 'winner' : ''}
          />
          <SlotSymbol
            type={SLOT_SYMBOL_TYPES[this.state.bottom]}
            style={{ transform: this.setupTransform(4) }}
            className={this.isLineWinner(2) ? 'winner' : ''}
          />
          { this.state.isSpinning ? <SlotSymbol
            type={SLOT_SYMBOL_TYPES[this.state.downerBottom]}
            style={{ transform: this.setupTransform(5) }}
            className={this.isLineWinner(2) ? 'winner' : ''}
          /> : null }
        </div>
      </div>
    );
  }
}

SlotReel.propTypes = {
  isSpinning: PropTypes.bool.isRequired,
  spinDelay: PropTypes.number.isRequired,
  onSpinStop: PropTypes.func.isRequired,
  winnerLines: PropTypes.array.isRequired,
  isDebug: PropTypes.bool.isRequired,
  debugPosition: PropTypes.object
};

SlotReel.defaultProps = {
  debugPosition: {}
};

export default SlotReel;
