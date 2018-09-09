import React from 'react';
//import PersonIcon from './PersonIcon';

class TaskItem extends React.Component {
  render(){
    return (
      <div>
        <div className={!this.props.isHome ? "is-box-outer" : 'is-article-outer'}>
          {/*<PersonIcon address={this.props.address}/>*/}
          <div className="tile is-ancestor">
            <div className="tile is-11 is-vertical is-parent">
              <div className="tile is-child">
                <h3 className="has-text-weight-bold is-size-4 has-font-serif">
                  {this.props.title}
                </h3>
              </div>
              <div className="tile is-child">
                <p className=" has-text-weight-light">
                  {this.props.description.slice(50)} ...
                </p>
              </div>
            </div>
            {!this.props.isHome &&
              <div className="tile is-parent">
                <div className="tile is-child">
                  <p className="subtitle is-4">{this.props.payout} ETH</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
};

export default TaskItem;
