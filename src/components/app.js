import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./app.css";
import _ from "lodash";
import TodoCreate from "./todo-create";
import TodoList from "./todo-list";
import NavPanel from "./NavPanel";

const AllOrderBy = ["date", "priority"];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      order: AllOrderBy[0],
      user: {
        name: ""
      }
    };
  }

  LoadData = () => {
    fetch("/tasks?sort=" + this.state.order)
      .then(response => response.json())
      .then(data => {
        this.setState({ todos: data });
      })
      .catch(e => {
        console.log("Ошибка получения данных", e);
      });
  };
  UserWho = () => {
    fetch("/user")
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data });
      })
      .catch(e => {
        console.log("Ошибка получения данных", e);
      });
  };

  componentDidMount() {
    this.UserWho();
    this.LoadData();
  }

  render() {
    return (
      <div>
        <NavPanel user={this.state.user} />
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div id="todolist" />
              <div>
                <div className="td-list-con">
                  <TodoCreate
                    todos={this.state.todos}
                    createTask={this.createTask.bind(this)}
                  />

                  <TodoList
                    todos={this.state.todos}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                    toggleTask={this.toggleTask.bind(this)}
                    orderHandler={this.orderHandler}
                    user={this.state.user}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  orderHandler = order => {
    this.setState(
      {
        order: AllOrderBy[order - 1]
      },
      () => this.LoadData()
    );
  };
  Sendtest = () => {
    let task = {
      priority: "1",
      task: "Make a React tutorial.",
      iscompleted: true
    };

    console.log("Posting request to API...");
    fetch("/tasks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("Created:", data);
      });
  };

  createTask(task, priority) {
    let taskObj = {
      priority: priority,
      task: task,
      iscompleted: false
    };
    fetch("/tasks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskObj)
    })
      .then(response => {
        return response.json();
      })
      .then(create => {
        if (create.status === "ok") {
          this.LoadData();
        }
        console.log("Created:", create.status);
      });
  }

  // Удаление задачи

  deleteTask(taskToDeleteText) {
    let taskToDelete = _.find(
      this.state.todos,
      todo => todo.task === taskToDeleteText
    );
    _.remove(this.state.todos, todo => todo.task === taskToDeleteText);
    this.setState({ todos: this.state.todos });
    fetch("/task?id=" + taskToDelete.id, {
      method: "delete"
    })
      .then(response => {
        return response.json();
      })
      .then(create => {
        console.log("Created:", create.status);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Сохранение

  saveTask(oldTask, newTask, newPriority, iscompleted) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    foundTodo.priority = newPriority;
    //костыли для вкуса
    if (iscompleted !== undefined) {
      foundTodo.iscompleted = iscompleted;
    }
    //необходимо данные обновить. так как мог измениться порядок сортировки
    fetch("/task", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foundTodo)
    })
      .then(response => {
        return response.json();
      })
      .then(create => {
        console.log("Update:", create.status);
        this.LoadData();
      })
      .catch(e => {
        console.log(e);
        this.LoadData();
      });
  }

  // отмечам задачу как выполненная

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    let iscompleted = !foundTodo.iscompleted;
    let { priority } = foundTodo;
    this.setState({ todos: this.state.todos });
    this.saveTask(task, task, priority, iscompleted);
  }
}

export default App;
