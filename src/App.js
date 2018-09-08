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
    const colonyClient = await networkClient.getColonyClient(26);
    const metaClient = await networkClient.getMetaColonyClient();
    //console.log(wallet)
    /*const op = await colonyClient.setTaskWorkerRole.startOperation({taskId: 1, user: wallet.address});
    const x = await op.sign();
    const y = await x.send();*/
//    console.log(await op.requiredSignees);
    //console.log(await y);
    const { count } = await networkClient.getColonyCount.call();
    const node = new IPFS({
      start: false,
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
            '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
            '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
            '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
            '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
            '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
          ],
        },
      },
      EXPERIMENTAL: {
        pubsub: true,
      },
    });
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
