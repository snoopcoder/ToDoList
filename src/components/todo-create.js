import React from "react";
import _ from "lodash";

import AddButton from "./AddButton";

export default class TodoCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priority: 1,
      error: null
    };
  }

  // Сообщение об ошибке

  renderError() {
    if (!this.state.error) {
      return null;
    }
    return (
      <p style={{ padding: "5px 10px", background: "#d9534f", color: "#fff" }}>
        {this.state.error}
      </p>
    );
  }

  render() {
    return (
      <form
        ref="CracteForm"
        className="create form-horizontal"
        onSubmit={this.handleCreate.bind(this)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 80px",
            marginBottom: "15px"
          }}
        >
          <div>
            <input
              className="form-control"
              type="text"
              ref="createInput"
              placeholder="What needs to be done?"
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <AddButton
              error={this.error}
              priority={this.state.priority}
              handleCreate={this.handleCreate}
              PriorityHandler={this.PriorityHandler}
            />
          </div>
        </div>
        {this.renderError()}
      </form>
    );
  }

  //   фокус на форму ввода таска сразу после загрузки страницы

  componentDidMount() {
    this.refs.createInput.focus();
  }

  PriorityHandler = priority => {
    this.setState({ priority });
  };

  // Создать таск
  handleCreate = () => {
    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);
    const priority = this.state.priority;

    if (validateInput) {
      this.setState({ error: validateInput });
      return false;
    }

    this.setState({ error: null });
    this.props.createTask(task, priority);
    this.refs.createInput.value = "";
  };

  // Проверка, что строка для названия задачи не пуста и не дублируется

  validateInput(task) {
    if (!task) {
      return "Please enter a task!";
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return "Task already exist!";
    } else {
      return null;
    }
  }
}
