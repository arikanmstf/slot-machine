import React, { Component, PropTypes } from 'react';

import { SLOT_SYMBOL_TYPES } from 'constants/SlotConstants';

class ReelSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slotSymbolTypes: SLOT_SYMBOL_TYPES,
      selected0: 0,
      selected1: 1,
      selected2: 2,
    };
  }

  componentWillMount() {
    this.props.onChange({
      top: this.state.selected0,
      center: this.state.selected1,
      bottom: this.state.selected2
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value, 10) }, () => {
      this.props.onChange({
        top: this.state.selected0,
        center: this.state.selected1,
        bottom: this.state.selected2
      });
    });
  };

  generateSelectBoxOptions = (name) => {
    const options = this.state.slotSymbolTypes.map((type) => {
      return (<option key={type.name} value={type.index} >{type.name}</option>);
    });
    return (
      <div><select className="select-box" value={this.state[name]} name={name} onChange={this.handleChange}>{options}</select></div>
    );
  };

  render() {
    return (
      <div className="reel-selector">
        {this.generateSelectBoxOptions('selected0')}
        {this.generateSelectBoxOptions('selected1')}
        {this.generateSelectBoxOptions('selected2')}
      </div>
    );
  }
}

ReelSelector.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ReelSelector;
