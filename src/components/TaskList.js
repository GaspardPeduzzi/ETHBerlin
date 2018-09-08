import React from 'react'

import TaskItem from "./TaskItem"
class TaskList extends React.Component {

    constructor(){
        super();
        this.state = {
            tasksId: [1,2,3]
        }
        this.createList = this.createList.bind(this);
    }

createList(){
    return (this.state.tasksId.map((id) =>
        <TaskItem id = {id} name="" description="" />
));
}

  render(){
    return (
        
        <div className="task-list">
                 {this.createList()}
        </div>

    );
    
}
}

export default TaskList;