import React from 'react';
import { Route } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskDetails from '../components/TaskDetails';

export default props => (
  <div>
    <Route path={`${props.match.path}/:taskId`} component={TaskDetails}/>
    <Route exact path={props.match.path} render={p => (
      <TaskList {...p} />
    )}/>
  </div>
)
