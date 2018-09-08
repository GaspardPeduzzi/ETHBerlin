import React from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    this.createList = this.createList.bind(this);
  }

  async componentDidMount() {
    const client = this.props.colonyClient;
    const { count } = await client.getTaskCount.call();
    const tasks = await Array(count)
      .fill()
      .map(async (_, i) =>
        await client.getTask.call({ taskId: i + 1})
      )
    Promise.all(tasks)
      .then(tasks => {
        console.table(tasks)
        const t = tasks.filter(task =>
            task.status === 'ACTIVE'
          ).filter(task =>
            this.props.isReview ? task.deliverableHash : true
          ).map(async (task, i) => {
            try {
              const t = JSON.parse((await this.props.node.files.cat(`/ipfs/${task.specificationHash}`)).toString());
              //const role = this.props.isReview ? 2 : 0;
              return {
                //address: await client.getTaskRole.call({ taskId: i, role }),
                ...t
              };
            } catch(e) {
              return await {
                title: "Task failed loading",
                description: "",
                //address: "0xCF085317456133E93D72aB5Fc56025d8d3802C38"
              }
            }
          });
        Promise.all(t)
          .then(tasks =>
            this.setState({ tasks })
          )
      })
  }

  createList() {
    return (this.state.tasks.map((task, i) =>
      <div key={JSON.stringify(task)} className="column">
        <Link to={`${this.props.match.url}/${i}`}>
          <TaskItem
            {...task}
          />
        </Link>
      </div>
    ));
  }

  render() {
    if (!this.props.node || !this.props.colonyClient) {
      return 'Loading...';
    }
    return (
      <section className="section is-open-blue">
        <div className = "container is-narrow">
          <div className="box">
            <div className = "task-list" >
              {this.createList()}
              </div>
              <div className="columns is-centered">
              <div className="column has-text-centered">
                  <a className="button is-submit-blue is-rounded is-large">
                      +
                  </a>
              </div>
              </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TaskList;
