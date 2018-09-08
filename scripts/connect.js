// Import the prerequisites
const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');
const { default: NetworkLoader } = require('@colony/colony-js-contract-loader-network');
const loader = new NetworkLoader({network: 'rinkeby'});
const provider = providers.getDefaultProvider(providers.networks.rinkeby);


// Import the ColonyNetworkClient
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');
const privateKeys = require("../src/env.js");


const connectNetwork = async (id) => {
    const pKey = privateKeys[id];


  // Create a wallet with the private key (so we have a balance we can use)
  const wallet = new Wallet(pKey, provider);

  // Create an adapter (powered by ethers)
  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet,
  });

  // Connect to ColonyNetwork with the adapter!
  const networkClient = new ColonyNetworkClient({ adapter });

  // Initialize networkClient
  await networkClient.init();

  // Check out the logs to see the address of the contract signer
  console.log('Account Address: ' + networkClient._contract.signer.address);

  // Check out the logs to see the address of the deployed network
  // console.log('Network Address: ' + networkClient._contract.address);

  // Return networkClient
  return networkClient;

};

// Export connectNetwork example
module.exports = connectNetwork;

