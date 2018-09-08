const connect = require('./connect');
const initialize = require('./init');

const network = await connect();
const { address, id } = initialize(network);
