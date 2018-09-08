import React from 'react'
import TaskItem from "./TaskItem"

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      tasksId: [1, 2, 3]
    }
    this.createList = this.createList.bind(this);
  }

  createList() {
    return (this.state.tasksId.map((id) =>
      <TaskItem
        id={id}
        name = ""
        description = ""
        key = {
          id.toString()
        }
      />
    ));
  }

  render() {
    return (
      <div className = "container is-narrow">
        <div className = "task-list" >
          {this.createList()}
        </div>
        <div className="columns is-centered">
          <div className="column has-text-centered">
            <a className="button is-primary">
              Primary
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;
