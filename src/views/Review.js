import React from 'react';
import { Route } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskDetails from '../components/TaskDetails'; // This will be Article

export default props => {
  if (!props.node || !props.colonyClient) {
    return 'Loading...';
  }
  return (
    <div>
      <Route path={`${props.match.path}/:taskId`} component={TaskDetails}/>
      <Route exact path={props.match.path} render={p => (
        <TaskList {...p} isReview={true} colonyClient={props.colonyClient} node={props.node} />
      )}/>
    </div>
  )
}
