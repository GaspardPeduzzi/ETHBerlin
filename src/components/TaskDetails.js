import React from 'react'
import { Buffer } from 'buffer';
import Task from "./Task"

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: 'task',
      article: '',
      title: ''
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
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

  onSubmit() {
    const taskId = Number(this.props.match.params.taskId) + 1;
    const data = Buffer.from(JSON.stringify({title: this.state.title, description: this.state.article}));
    this.props.node.files.add(data).then(result => {
      const deliverableHash = result[0].hash;
      this.props.colonyClient.submitTaskDeliverable.send({taskId, deliverableHash}).then(console.table);
    })
  }

  onInput(e) {
    this.setState({article: e.target.value});
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  render() {
    return (
      <section className="section is-open-blue">
        <div className = "container is-narrow">
          <div className="box">
            <Task task={this.state.task}/>
            <h1 className="title is-5">Submit article</h1>
            <input className="input" type="text" placeholder="Title" value={this.state.title} onChange={this.onChangeTitle}/>
            <textarea className="textarea" placeholder="Write your article here" value={this.state.article} onChange={this.onInput}/>
            <br/>
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <a className="button is-submit-blue is-rounded is-large" onClick={this.onSubmit}>
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
