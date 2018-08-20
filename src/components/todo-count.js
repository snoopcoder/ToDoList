import React from "react";
import _ from "lodash";

export default class TodoCount extends React.Component {
  // Отрисовка количетсва задач

  renderTasksCount() {
    const tasksCount = _.filter(this.props.todos, o => {
      return !o.iscompleted;
    }).length;
    return " Всего задач: " + tasksCount;
  }

  render() {
    return <p>{this.renderTasksCount()}</p>;
  }
}
