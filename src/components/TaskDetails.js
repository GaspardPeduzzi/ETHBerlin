import React from 'react'

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "task"
    }
  }

  async componentDidMount() {
    const taskId = this.props.match.params.taskId;
    const client = this.props.colonyClient;
    const task = await client.getTask.call({ taskId: Number(taskId)})
    console.log('hello')
    try {
      const result = (await this.props.node.files.cat(`/ipfs/${task.specificationHash}`)).toString();
      this.setState({ task: await result });
    } catch(e) {
      this.setState({ task: await 'Could not load task' });
    }
  }

  render() {
    return (
      <section className="section has-background-light">
        <div className = "container is-narrow">
          <div className = "task-details" >
            <h2 className="task-title">Task Title</h2>
            <p className="task-details">
              {JSON.stringify(this.state.task)}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default TaskDetails;
