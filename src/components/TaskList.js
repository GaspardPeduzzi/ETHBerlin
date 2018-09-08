import React from 'react'
import TaskItem from "./TaskItem"

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
    this.createList = this.createList.bind(this);
  }

  async componentDidMount() {
    const client = this.props.colonyClient;
    const { count } = await client.getTaskCount.call();
    let tasks = Array(count)
      .fill()
      .map(async (_, i) => {
        const t = await client.getTask.call({ taskId: i + 1})
        return t
      }
      ).filter(async task => {
        return await task.status === 'ACTIVE';
      }
      ).map(async task => {
        try {
          const t = JSON.parse((await this.props.node.files.cat(`/ipfs/${task.specificationHash}`)).toString())
          return t;
        } catch(e) {
          return await {
            title: "Task failed loading",
            description: ""
          }
        }
      });
    console.table(tasks);
    Promise.all(tasks)
      .then(tasks => this.setState({ tasks }));
  }

  createList() {
    return (this.state.tasks.map(task =>
      <TaskItem
        key={JSON.stringify(task)}
        id={1}
        title={task.title}
        description={task.description}
      />
    ));
  }

  render() {
    console.log(this.state.tasks)
    if (!this.props.node || !this.props.colonyClient) {
      return 'Loading...';
    }
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
