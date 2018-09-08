import React from 'react'

class TaskItem extends React.Component {
  render(){
    return (
      <div>
        <div className="box">
          <div className="task-title">
            <h3 className="has-text-weight-bold is-size-4"> Title {this.props.id}</h3>
          </div>
          <div className="task-description">
            <p>
              Curabitur sit amet molestie lorem. Aliquam sit amet lacus dolor. Duis molestie tellus a elit gravida,
              non pulvinar nibh ultrices. Nulla facilisi. Nullam nec leo eget metus euismod sodales quis id quam.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskItem;
