import React from 'react'

class Task extends React.Component {
  render() {
    return (
      <div className="content">
        <h2 className="task-title is-size-1 has-text-weight-bold has-text-grey-darker">{this.props.task.title}</h2>
        <p className="tast-details has-text-weight-light has-text-grey">
          {this.props.task.description}
        </p>
      </div>
    );
  }
}

export default Task;
