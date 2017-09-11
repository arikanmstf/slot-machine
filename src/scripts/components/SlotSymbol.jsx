import React, { Component, PropTypes } from 'react';

class SlotSymbol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.className ? ` ${this.props.className}` : ''
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      className: nextProps.className ? ` ${nextProps.className}` : ''
    });
  }

  render() {
    return (
      <img
        className={`slot-symbol${this.state.className}`}
        src={this.props.type.url}
        alt={this.props.type.name}
        style={this.props.style}
      />
    );
  }
}

SlotSymbol.propTypes = {
  type: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default SlotSymbol;
