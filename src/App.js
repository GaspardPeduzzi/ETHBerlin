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
import keys from './env';
import IPFS from 'ipfs';
import './App.css';
const RINKEBY_PRIVATE_KEY = keys[0]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metaClient: null,
      colonyClient: null,
      count: '',
      node: null
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
    const colonyClient = await networkClient.getColonyClient(15);
    const metaClient = await networkClient.getMetaColonyClient();
    const { count } = await networkClient.getColonyCount.call();
    const node = new IPFS();
    node.on('ready', () => {
      this.setState({ node });
    })
    this.setState({ colonyClient, metaClient, count });
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar" aria-label="main navigation">
            <div className="navbar-start">
              <h1 className="navbar-item title has-font-serif is-1">
                <Link to="/" className="has-text-dark">
                  The Open Times
                </Link>
              </h1>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/redaction" className="has-text-dark subtitle is-1">
                  Redaction
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/review" className="has-text-dark subtitle is-1">
                  Review
                </Link>
              </div>
            </div>
          </nav>
          <Route path="/redaction" render={p => <Redaction {...p} colonyClient={this.state.colonyClient} node={this.state.node}/>}/>
          <Route path="/review" render={p => <Review {...p} colonyClient={this.state.colonyClient} node={this.state.node}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
