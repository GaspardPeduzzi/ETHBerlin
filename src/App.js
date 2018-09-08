import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { providers, Wallet } from 'ethers';
import EthersAdapter from '@colony/colony-js-adapter-ethers';
import NetworkLoader from '@colony/colony-js-contract-loader-network';
import ColonyNetworkClient from '@colony/colony-js-client';
import Redaction from './views/Redaction';
import Review from './views/Review';
import { RINKEBY_PRIVATE_KEY } from './env';
import './App.css';


import TaskList from "./components/TaskList"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metaClient: {},
      colonyClient: {},
      count: ''
    };
  }

  async componentDidMount() {
    const loader = new NetworkLoader({network: 'rinkeby'});
    const provider = providers.getDefaultProvider(providers.networks.rinkeby);
    const wallet = new Wallet(RINKEBY_PRIVATE_KEY, provider);
    const adapter = new EthersAdapter({
      loader,
      provider,
      wallet
    });
    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();
    const colonyClient = await networkClient.getColonyClient(1);
    const metaClient = await networkClient.getMetaColonyClient();
    const { count } = await networkClient.getColonyCount.call()
    this.setState({colonyClient, metaClient, count});
  }

  render() {
    return (
      <Router>
        <div>
          <TaskList/>
          <p>
            There are {this.state.count} colonies on Rinkeby
          </p>
          <Link to="/redaction" className="button">
            Redaction
          </Link>
          <Link to="/review" className="button">
            Review
          </Link>
          <p>
            <Route path="/redaction" component={Redaction}/>
            <Route path="/review" component={Review}/>
          </p>
        </div>
      </Router>
    );
  }
}

export default App;
