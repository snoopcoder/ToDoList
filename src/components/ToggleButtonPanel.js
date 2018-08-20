import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

class ToggleButtonPanel extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: [1]
    };
  }

  render() {
    return (
      <ToggleButtonGroup
        type="checkbox"
        defaultValue={this.state.value}
        value={this.state.value}
        onChange={this.controller}
      >
        <ToggleButton value={1} className="btn-sm">
          По дате
        </ToggleButton>
        <ToggleButton value={2} className="btn-sm">
          Приоритет
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
  controller = e => {
    if (e.length !== 0) {
      let sort = this.state.value[0] === 1 ? 2 : 1;
      this.setState({
        value: [sort]
      });
      this.props.orderHandler(sort);
    }
  };
}
export default ToggleButtonPanel;
