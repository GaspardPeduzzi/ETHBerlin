import React from 'react'
import Task from "./Task"
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
    const task = await client.getTask.call({ taskId: Number(taskId) + 1})
    try {
      const result = (await this.props.node.files.cat(`/ipfs/${task.specificationHash}`)).toString();
      this.setState({ task: JSON.parse(await result) });
    } catch(e) {
      this.setState({ task: await {title: 'Could not load task', description: ''}});
    }
  }

  render() {
    return (
      <section className="section is-open-blue">
        <div className = "container is-narrow">
          <div className="box">
            <Task task={this.state.task}/>
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <a className="button is-submit-blue is-rounded is-large">
                  SUBMIT
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TaskDetails;
