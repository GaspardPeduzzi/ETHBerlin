import React from 'react'
import { Buffer } from 'buffer';
import Task from "./Task"
import { Route, Redirect } from 'react-router';

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: 'task',
      article: '',
      title: '',
      redirect: false
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  async componentDidMount() {
    const taskId = this.props.match.params.taskId;
    const client = this.props.colonyClient;
    const task = await client.getTask.call({ taskId: Number(taskId) })
    try {
      const result = (await this.props.node.files.cat(`/ipfs/${task.specificationHash}`)).toString();
      this.setState({ task: JSON.parse(await result) });
    } catch (e) {
      this.setState({ task: await { title: 'Could not load task', description: '' } });
    }
  }

  onSubmit() {
    const taskId = Number(this.props.match.params.taskId);
    const data = Buffer.from(JSON.stringify({title: this.state.title, description: this.state.article}));
    this.props.node.files.add(data).then(result => {
      const deliverableHash = result[0].hash;
      this.props.colonyClient.submitTaskDeliverable.send({ taskId, deliverableHash }).then(this.setRedirect);
    });
  }

  onInput(e) {
    this.setState({ article: e.target.value });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/review' />
    }
  }

  render() {
    return (
      <section className="section is-open-blue">
        <div className="container is-narrow">
          <div className="is-box-outer">
            <Task task={this.state.task} />
            <h1 className="title is-5">Submit article</h1>
            <input className="input" type="text" placeholder="Title" value={this.state.title} onChange={this.onChangeTitle} />
            <textarea className="textarea" placeholder="Write your article here" value={this.state.article} onChange={this.onInput} />
            <br />
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <a className="button is-submit-blue is-rounded is-large" onClick={this.onSubmit}>
                  {this.renderRedirect()}
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
