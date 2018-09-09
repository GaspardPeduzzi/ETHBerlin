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
            this.props.isReview || this.props.isHome ? task.deliverableHash : !task.deliverableHash
          ).map(async task => {
            const hash = this.props.isReview || this.props.isHome ? task.deliverableHash : task.specificationHash
            console.log(hash)
            try {
              const t = JSON.parse((await this.props.node.files.cat(`/ipfs/${hash}`)).toString());
              //const role = this.props.isReview ? 2 : 0;
              return {
                //address: await client.getTaskRole.call({ taskId: task.id, role }),
                id: task.id,
                ...(await t)
              };
            } catch(e) {
              return await {
                title: "Task failed loading",
                description: "",
                id: task.id
                //address: "0xCF085317456133E93D72aB5Fc56025d8d3802C38"
              }
            }
          }).map(async (task) => {
            console.log(await task)
            //const { amount }= await client.getTaskPayout.call({ taskId: (await task).id, role: 'WORKER', token: '0x0'})
            const { rating } = await client.getTaskRole.call({ taskId: (await task).id, role: 'WORKER' })
            console.log(await rating)
            return {
              payout: /*(await amount).toNumber(),*/String(Math.random() * 4).slice(0, 4),//(await payout).amount.toString(),
              rating: await rating,
              ...(await task)
            }
          });
        Promise.all(t)
          .then(tasks =>
            this.setState({ tasks })
          )
      }).catch(console.log)
  }

  createList() {
    return (this.state.tasks.map(task =>
      <div key={JSON.stringify(task)} className="column">
        <Link to={`${this.props.match.url === '/' ? '/' : this.props.match.url + '/'}${task.id}`}>
          <TaskItem
            isHome={this.props.isHome}
            isReview={this.props.isReview}
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
      <section className={`section has-full-height ${!this.props.isHome ? 'is-open-blue' : ''}`}>
        <div className = "container is-narrow">
          <div className={!this.props.isHome ? 'is-box-outer' : ''}>
            <div className = "task-list" >
              {this.createList()}
              </div>
              <div className="columns is-centered">
                {!this.props.isHome &&
                  <div className="column has-text-centered">
                    <a className="button is-submit-blue is-rounded is-large">
                      +
                    </a>
                  </div>
                }
              </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TaskList;
