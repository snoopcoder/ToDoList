import React from "react";
import _ from "lodash";
import TodoCount from "./todo-count";
import TodoListItem from "./todo-list-item";
import ToggleButtonPanel from "./ToggleButtonPanel";
import uniqid from "uniqid";

export default class TodoList extends React.Component {
  // компонент для размещение тасков

  constructor(props) {
    super(props);

    this.state = {
      EditAllow: false
    };
  }

  renderTodoItems() {
    //очистка пропсов от массива c тасками, чтобы передать их дальше в компонент отрисовки таска
    //TODO заменить значение для key, либо уникальный id либо генерация случайного Id
    const props = _.omit(this.props, "todos");
    return _.map(this.props.todos, (todo, index) => {
      return (
        <TodoListItem
          todos={this.props.todos}
          key={uniqid()}
          {...todo}
          {...props}
          editStart={this.childEditHandler}
          {...this.state}
        />
      );
    });
  }

  render() {
    return (
      <div className="list form-horizontal">
        <div
          className="bg-info"
          style={{
            padding: "1px 1px",
            display: "grid",
            gridTemplateColumns: "100px auto",
            marginBottom: "10px"
          }}
        >
          <TodoCount todos={this.props.todos} />
          <div style={{ textAlign: "right" }}>
            <ToggleButtonPanel orderHandler={this.props.orderHandler} />
          </div>
        </div>
        {this.renderTodoItems()}
      </div>
    );
  }
  childEditHandler = id => {
    this.setState({
      EditAllow: id
    });
  };
}
