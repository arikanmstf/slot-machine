import React, { Component, PropTypes } from 'react';

import PayTableLine from 'components/PayTableLine';
import { PAY_TYPES } from 'constants/PayTableConstants';

class PayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerLines: this.props.winnerLines
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ winnerLines: nextProps.winnerLines });
  }

  isWinner = (id) => {
    return this.state.winnerLines.some((line) => {
      return line.ID === id;
    });
  }

  renderLines = () => {
    return PAY_TYPES.map((payType) => {
      return (<PayTableLine key={payType.ID} type={payType} isWinner={this.isWinner(payType.ID)} />);
    });
  }

  render() {
    return (
      <div className="pay-table">
        <table>
          <tbody>
            {this.renderLines()}
          </tbody>
        </table>
      </div>
    );
  }
}

PayTable.propTypes = {
  winnerLines: PropTypes.array.isRequired
};

export default PayTable;
