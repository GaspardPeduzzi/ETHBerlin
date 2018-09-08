import React from 'react'
import Task from './Task';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      task: {}
    }
  }

  async componentDidMount() {
    const taskId = Number(this.props.match.params.taskId) + 1;
    const client = this.props.colonyClient;
    const task = await client.getTask.call({ taskId })
    try {
      const result = (await this.props.node.files.cat(`/ipfs/${task.specificationHash}`)).toString();
      this.setState({ task: JSON.parse(await result) });
    } catch(e) {
      this.setState({ task: await { title: 'Could not load task', description: '' }});
    }
    try {
      const result = (await this.props.node.files.cat(`/ipfs/${task.deliverableHash}`)).toString();
      this.setState({ article: JSON.parse(await result) });
    } catch(e) {
      this.setState({ article: await {title: 'Could not load article', description: '' }});
    }
  }

  render() {
    return (
      <div>
        <section className="section">
          <div className = "container is-narrow">
            <div className="is-box-outer">
              <div className="columns is-centered">
                <div className="column is-two-thirds">
                  <div className="content">
                      <h2 className="task-title is-size-1 has-text-black has-text-weight-bold has-font-serif has-text-centered">
                        {this.state.article.title}
                      </h2>
                      <p className="tast-details has-text-black has-text-weight-light has-font-serif is-size-7">
                        {this.state.article.description}
                      </p>
                  </div>


                  <div className="columns is-centered">
                      <div className="column has-text-centered">
                        <div className="buttons is-centered">
                          <span className="button is-not-satisfiable is-rounded ">Unsatisfactory</span>
                          <span className="button  is-satisfiable is-rounded">satisfactory</span>
                          <span className="button is-excellent is-rounded">Excellent</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="is-box-outer">
              <Task task={this.state.task} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Article;
