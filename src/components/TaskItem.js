import React from 'react'

class TaskItem extends React.Component {
  render(){
    return (
      <div>
        <div className="box">
          <div className="task-title">
            <h3 className="has-text-weight-bold is-size-4 has-font-serif">{this.props.title}</h3>
          </div>
          <div className="task-description">
            <p className=" has-text-weight-light">
              {this.props.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskItem;
