import React from 'react'

class TaskItem extends React.Component {


    constructor(props){
        super(props);

    }

  render(){
    return (
        <div>
            <div className="task-box">
                <div className="task-title"> <h3> Title {this.props.id} </h3></div>
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