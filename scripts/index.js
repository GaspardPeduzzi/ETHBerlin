const connectNetwork = require('./connect');
const initialize = require('./init');

const network = await connectNetwork();
const { address, id } = await initialize(network);
