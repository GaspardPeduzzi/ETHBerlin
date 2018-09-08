// This is what will become a part of ColonyJS - The Extended Colony Protocol

// It will make the Colony Network more human usable with functionality for
// non-consensus-relevant contexts by enriching the data stored on chain with
// metadata (which might be too expensive to store on chain).
// It helps developers building on the Colony Network provide a web 2.0 like
// user experience, without compromising decentralisation.

const IPFS = require('ipfs');
const { Buffer } = require('buffer');

let node;

const waitForIPFS = () => {
    node = new IPFS({
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
    return new Promise((resolve, reject) => {
    node.on('ready', () => resolve(true));
    node.on('error', err => reject(err));
    });
    };
    
    

exports.init = async () => {
  await waitForIPFS();
  return node.start();
}

exports.saveHash = async (obj) => {
  const data = Buffer.from(JSON.stringify(obj));
  const result = await node.files.add(data);
  return result[0].hash;
}

exports.getHash = async (hash) => {
  const buf = await node.files.cat(`/ipfs/${hash}`);
  let obj;
  try {
    obj = JSON.parse(buf.toString());
  } catch (err) {
    throw new Error(`Could not get hash ${hash}`);
  }
  return obj;
}

exports.stop = () => node.stop();