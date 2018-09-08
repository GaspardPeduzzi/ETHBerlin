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
    <div className="column">
        <a href="">
        <TaskItem
                id={id}
                name = ""
                description = ""
                key = {
                id.toString()
                }/>
        </a>
    </div>
    
    ));
  }

  render() {
    return (
      <section className="section has-background-light">
        <div className = "container is-narrow">
            <div className = "task-list" >
            {this.createList()}
            </div>
            <div className="columns is-centered">
            <div className="column has-text-centered">
                <a className="button is-primary is-rounded is-large">
                     +
                </a>
            </div>
            </div>
        </div>
      </section>
    );
  }
}

export default TaskList;
