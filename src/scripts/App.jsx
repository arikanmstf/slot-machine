import React, { Component } from 'react';

// Everything is a Component
import SlotMachine from 'components/SlotMachine';
import BalanceText from 'components/BalanceText';
import PayTable from 'components/PayTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpinning: false,
      winnerLines: [],
      isDebug: false,
      debugPosition: { reel1: null, reel2: null, reel3: null }
    };
  }

  handleSpinStart = (balanceState) => {
    this.setState({
      isSpinning: true,
      winnerLines: [],
      isDebug: balanceState.isDebug,
      debugPosition: balanceState.debugPosition
    });
  }
  handleSpinStop = () => {
    this.setState({ isSpinning: false });
  }
  updateWinners = (winnerLines) => {
    this.setState({ winnerLines });
  }

  render() {
    return (
      <div className="app">
        <BalanceText
          onSpinStart={this.handleSpinStart}
          winnerLines={this.state.winnerLines}
        />
        <SlotMachine
          isSpinning={this.state.isSpinning}
          allSpinsStopped={this.handleSpinStop}
          updateWinners={this.updateWinners}
          isDebug={this.state.isDebug}
          debugPosition={this.state.debugPosition}
        />
        <PayTable winnerLines={this.state.winnerLines} />
      </div>
    );
  }
}

export default App;
