// An example using the createToken method
const createToken = async (networkClient, name, symbol) => {

  // Create a new ERC20 token
  const tokenAddress = await networkClient.createToken({ name, symbol });

  // Check out the logs to see the token address
  console.log('Token Address: ' + tokenAddress);

  // Return the address
  return tokenAddress;

};

// An example using the createColony method
const createColony = async (networkClient, tokenAddress) => {

  // Create a colony with the given token
  const {
    eventData: { colonyAddress, colonyId }
  } = await networkClient.createColony.send({ tokenAddress }, { gasLimit: 4432466 });

  // Check out the logs to see our new colony address
  console.log('Colony Address:', colonyAddress);

  // Check out the logs to see our new colony id
  console.log('Colony ID:', colonyId);

  // Return our new colony
  return {
    address: colonyAddress,
    id: colonyId,
  };

};

const initialize = async (networkClient) => {
  const token = await createToken(networkClient, 'OpenTimes', 'OPT');
  const colony = await createColony(networkClient, token);
  return colony;
};

module.exports = initialize;
