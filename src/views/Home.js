import React from 'react';
import { Route } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Article from '../components/Article';

export default props => {
  if (!props.node || !props.colonyClient) {
    return 'Loading...';
  }
  return (
    <div>
      <Route exact path={props.match.path} render={p => (
        <TaskList {...p} isHome={true} colonyClient={props.colonyClient} node={props.node} />
      )}/>
    </div>
  )
}
