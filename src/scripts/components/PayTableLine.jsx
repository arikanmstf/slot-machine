import React, { Component, PropTypes } from 'react';

import SlotSymbol from 'components/SlotSymbol';
import { SLOT_SYMBOL_TYPES } from 'constants/SlotConstants';

class PayTableLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWinner: this.props.isWinner
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isWinner: nextProps.isWinner });
  }

  generateClassName = () => {
    return this.state.isWinner ? 'pay-table-line winner' : 'pay-table-line';
  }

  renderSymbols = () => (
    this.props.type.SYMBOLS.map((symbol, index) => (
      <td key={index}><SlotSymbol type={SLOT_SYMBOL_TYPES[symbol]} /></td> // eslint-disable-line react/no-array-index-key
    ))
  );

  render() {
    return (
      <tr className={this.generateClassName()}>
        <td>{this.props.type.LINE.label}</td>
        {this.renderSymbols()}
        <td>{this.props.type.AMOUNT}</td>
      </tr>
    );
  }
}

PayTableLine.propTypes = {
  type: PropTypes.object.isRequired,
  isWinner: PropTypes.bool.isRequired
};

export default PayTableLine;
