import React, { Component, PropTypes } from 'react';
import { SPIN_DELAY, SPIN_EACH_STOP_DELAY, SLOT_SYMBOL_TYPES } from 'constants/SlotConstants';
import { MAXIMUM, MINIMUM, DEFAULT, SPIN_BET } from 'constants/BalanceConstants';

import ReelSelector from 'components/ReelSelector';
import Log from 'common/Log';

class BalanceText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: DEFAULT,
      isSpinning: false,
      isDebug: false,
      debugPosition: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isSpinning && nextProps.winnerLines && nextProps.winnerLines.length > 0) {
      let balance = 0;
      nextProps.winnerLines.map((line) => {
        balance += line.AMOUNT;
        return line;
      });
      this.onWin(balance);
    }
  }

  onWin = (balance) => {
    Log(`You won: ${balance}`);
    this.setState((prevState) => ({ balance: prevState.balance + balance }));
  }

  setDebugPosition = (debugPosition, reelName) => {
    this.setState((prevState) =>
      ({ debugPosition: Object.assign(prevState.debugPosition, { [reelName]: debugPosition }) })
    );
  }

  startSpin = () => {
    if (this.state.balance >= SPIN_BET) {
      this.setState((prevState) => ({ balance: prevState.balance - SPIN_BET, isSpinning: true }));
      this.props.onSpinStart(this.state);

      setTimeout(() => {
        this.setState({ isSpinning: false });
      }, SPIN_DELAY + (SPIN_EACH_STOP_DELAY * 2));
    } else {
      Log(`You do not have enough balance`);
    }
  }

  selectSymbolOptions = () => {
    return SLOT_SYMBOL_TYPES.map((symbol) => (
      <option>{symbol.name}</option>
    ));
  }

  debugToggle = () => {
    this.setState((prevState) => ({ isDebug: !prevState.isDebug }));
  }

  handleChange = (event) => {
    if (event.target.value <= MAXIMUM && event.target.value >= MINIMUM) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  renderDebug = () => {
    return (
      <div className="debug-area">
        <h5>Set up the symbols and press SPIN button</h5>
        {<ReelSelector onChange={(event) => { this.setDebugPosition(event, 'reel1'); }} />}
        {<ReelSelector onChange={(event) => { this.setDebugPosition(event, 'reel2'); }} />}
        {<ReelSelector onChange={(event) => { this.setDebugPosition(event, 'reel3'); }} />}
      </div>
    );
  }

  render() {
    return (
      <div className="balance-text">
        <div>Debug: <input disabled={this.state.isSpinning} type="checkbox" checked={this.state.isDebug} onChange={this.debugToggle} /></div>
        <div className="label">Your current balance is:</div>
        <input disabled={this.state.isSpinning} name="balance" type="number" value={this.state.balance} max={MAXIMUM} min={MINIMUM} onChange={this.handleChange} />
        <div><button className="btn-spin" disabled={this.state.isSpinning} onClick={this.startSpin}>SPIN !</button></div>
        { this.state.isDebug ? this.renderDebug() : null }
      </div>
    );
  }
}

BalanceText.propTypes = {
  onSpinStart: PropTypes.func.isRequired,
  winnerLines: PropTypes.array.isRequired
};

export default BalanceText;
