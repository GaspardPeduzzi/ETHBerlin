import React from 'react';
import TaskList from '../components/TaskList';
export default props => {
  if (!props.node || !props.colonyClient) {
    return 'Loading...';
  }
  return <TaskList colonyClient={props.colonyClient} node={props.node}/>
}
