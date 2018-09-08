import React, { Component } from 'react';
import { providers, Wallet } from 'ethers';
import EthersAdapter from '@colony/colony-js-adapter-ethers';
import NetworkLoader from '@colony/colony-js-contract-loader-network'
import ColonyNetworkClient from '@colony/colony-js-client';
import { RINKEBY_PRIVATE_KEY } from './env';
import logo from './logo.svg';
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
      <div>
        <TaskList />
        There are {this.state.count} colonies on Rinkeby
      </div>
    );
  }
}

export default App;
