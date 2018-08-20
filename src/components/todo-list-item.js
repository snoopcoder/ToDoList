import React from "react";
import { Button } from "react-bootstrap";
import _ from "lodash";
import AddButton from "./AddButton";

const PriorityColor = ["#e0e0e0", "#4fa84f", "#eea033", "#d64f4b"];

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: props.priority
    };
  }

  // Рендер содержимого задачи

  renderTaskSection() {
    const { task, iscompleted } = this.props;
    const textStyle = iscompleted ? "line-through" : "none";
    const textColor = iscompleted ? "#DCDCDC" : "#000000";
    const priorityColor = iscompleted
      ? "#DCDCDC"
      : PriorityColor[this.state.priority];
    const taskStyle = {
      cursor: "pointer"
    };

    //Рендер режима редактирования
    if (this.props.EditAllow == this.props.id) {
      return (
        <div
          style={{
            display: " block",
            flex: "1",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          <label className=" text-left">
            <span
              className="glyphicon glyphicon glyphicon-circle-arrow-right"
              style={{
                display: "inline-block",
                color: priorityColor,
                fontSize: "18px"
              }}
            />
            <form
              style={{ display: "inline-block" }}
              onSubmit={this.onSaveClick.bind(this)}
              ref="ItemForm"
            >
              <input
                className="form-control input-sm"
                defaultValue={task}
                ref="editInput"
                type="text"
              />
            </form>
          </label>
        </div>
      );
    }
    //рендер основного режима
    return (
      <div
        style={{
          display: " block",
          flex: "1",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
      >
        <label
          className={"  text-left text"}
          style={taskStyle}
          onClick={this.props.toggleTask.bind(this, task)}
        >
          <span
            className="glyphicon glyphicon glyphicon-circle-arrow-right"
            style={{
              display: "inline-block",
              color: priorityColor,
              fontSize: "18px"
            }}
          />
          <span
            style={{
              display: "inline-block",
              color: textColor,
              textDecoration: textStyle
            }}
          >
            <p>{task}</p>
          </span>
        </label>
      </div>
    );
  }

  // Рендер области кнопок

  renderActionSection() {
    let buttonToolbox = "";
    if (this.props.EditAllow == this.props.id) {
      //режим редактирования
      buttonToolbox = (
        <div>
          <AddButton
            priority={this.props.priority}
            handleCreate={this.onSaveClick.bind(this)}
            PriorityHandler={this.PriorityHandler}
          />
          &nbsp;
          <Button className="btn btn-primary " onClick={this.onDeleteClick}>
            Delete
          </Button>
        </div>
      );
    } else if (this.state.showButtons && !this.props.EditAllow) {
      //стандартный режим
      buttonToolbox = (
        <div>
          <Button
            className="btn btn-primary "
            onClick={this.onEditClick.bind(this)}
          >
            Edit
          </Button>
          &nbsp;
          <Button className="btn btn-primary " onClick={this.onDeleteClick}>
            Delete
          </Button>
        </div>
      );
    } else if (this.props.user.role == "admins") {
      //кнопки не показваем, выведем владельцев тасков для админа
      buttonToolbox = <div>{this.props.owner}</div>;
    } else {
      buttonToolbox = <div />;
    }

    return (
      <div
        className=" text-right"
        style={{
          width: "160px",
          display: "block",
          paddingLeft: "2px"
        }}
      >
        {buttonToolbox}
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "60px",
          lineHeight: "46px"
        }}
        onMouseEnter={this.MouseEnterHandler}
        onMouseLeave={this.MouseLeaveHandler}
      >
        {this.renderTaskSection()}
        {this.renderActionSection()}
      </div>
    );
  }

  // Открывается форма редактирования, она получает фокус

  componentDidUpdate() {
    if (this.props.EditAllow == this.props.id) {
      this.refs.editInput.focus();
    }
  }

  MouseEnterHandler = () => {
    this.setState({
      showButtons: true
    });
  };

  MouseLeaveHandler = () => {
    this.setState({
      showButtons: false
    });
  };

  // Устанавливаем статус редактирования

  onDeleteClick = () => {
    this.props.deleteTask(this.props.task);
    this.props.editStart(false);
  };

  onEditClick = () => {
    this.setState({ isEditing: true });
    //для того чтобы не отображалось много кнопок
    this.props.editStart(this.props.id);
  };

  // Отменить статус редактирования

  onCancelClick() {
    this.setState({ isEditing: false });
    this.props.editStart(false);
  }

  //пришло измененеме приоритета во время режима редактирования
  PriorityHandler = priority => {
    this.setState({
      priority
    });
  };

  // Сохранить

  onSaveClick = event => {
    const oldTask = this.props.task;
    let newTask = this.refs.editInput.value;
    newTask = newTask.trim();
    if (this.validateInput(newTask)) {
      this.props.editStart(false);
      this.props.saveTask(oldTask, newTask, this.state.priority);
    } else {
      this.refs.editInput.value = oldTask;
    }
  };

  validateInput(task) {
    if (!task) {
      return false;
    } else if (task === this.props.task) {
      return true;
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return false;
    } else {
      return true;
    }
  }
}
