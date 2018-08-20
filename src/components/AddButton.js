import React, { Component } from "react";
import { SplitButton, MenuItem } from "react-bootstrap";

const Priority = ["default", "success", "warning", "danger"];

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priority: props.priority
    };
  }

  PriorityHandler = priority => {
    this.setState({ priority });
    this.props.PriorityHandler(priority);
  };

  ClickHandler = () => {
    this.props.handleCreate();
    if (this.props.error) {
      this.setState({
        priority: "1"
      });
    }
  };

  render() {
    return (
      <SplitButton
        bsStyle={Priority[this.state.priority]}
        title={"Ok"}
        id={`dropdown-basic}`}
        onClick={this.ClickHandler}
      >
        <p style={{ padding: "1px 20px" }}>
          <small>Выбор приоритета</small>
        </p>
        <MenuItem divider />
        <MenuItem
          eventKey="3"
          active={this.state.priority === "3" ? true : false}
          onSelect={this.PriorityHandler}
        >
          Чрезвычайный
        </MenuItem>
        <MenuItem
          eventKey="2"
          active={this.state.priority === "2" ? true : false}
          onSelect={this.PriorityHandler}
        >
          Высокий
        </MenuItem>
        <MenuItem
          eventKey="1"
          active={this.state.priority === "1" ? true : false}
          onSelect={this.PriorityHandler}
        >
          Нормальный
        </MenuItem>
        <MenuItem
          eventKey="0"
          active={this.state.priority === "0" ? true : false}
          onSelect={this.PriorityHandler}
        >
          Низкий
        </MenuItem>
      </SplitButton>
    );
  }
}

export default AddButton;
