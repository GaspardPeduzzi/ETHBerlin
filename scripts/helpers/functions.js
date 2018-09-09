const BN = require('bn.js');
const ecp = require('./ecp');

// An example using the getColonyClient method
module.exports.getColonyClient = async (networkClient, colonyId) => {

    // Get the colonyClient using the colonyId
    const colonyClient = await networkClient.getColonyClient(colonyId);
  
    // Alternatively, we can get the colonyClient using the colonyAddress
    // const colonyClient = await networkClient.getColonyClientByAddress(
    //   colonyAddress,
    // );
  
    // Check out the logs to see the address of the colonyClient
    console.log('Colony Address:', colonyClient.contract.address);
  
    // Return the colonyClient
    return colonyClient;
};

// An example using the addDomain method
module.exports.addDomain = async (colonyClient, networkClient, parentDomainId) => {

    // In order to add a domain to our colony, we will need the local skill id of
    // the parent domain. Domains are registered as local skills, so we will use
    // the parent domain id to get the local skill id of the parent domain, which
    // we will then use as the parent skill id when we add our new domain.
    const { localSkillId: parentSkillId } = await colonyClient.getDomain.call({
      domainId: parentDomainId,
    });
  
    // Create a new domain using the local skill id of the parent domain
    await colonyClient.addDomain.send({
      parentSkillId: parentDomainId,
    });
  
    // Get the id of the skill we just created
    const { count: skillId } = await networkClient.getSkillCount.call();
  
    // Get the total number of domains in the colony (our new domain id)
    const { count: domainId } = await colonyClient.getDomainCount.call();
  
    // Get the pot id of our new domain
    const { potId } = await colonyClient.getDomain.call({ domainId });
  
    // Check out the logs to see our new domain
    console.log('Domain:', {
      id: domainId,
      parentSkillId,
      skillId,
      potId,
    });
  
    // Return our new domain
    return {
      id: domainId,
      parentSkillId,
      skillId,
      potId,
    };
  
};

// An example using the moveFundsBetweenPots method
module.exports.moveFundsBetweenPots = async (colonyClient, fromPot, toPot, amount, token) => {

  // Move funds between pots
  await colonyClient.moveFundsBetweenPots.send({
    fromPot,
    toPot,
    amount: new BN(amount),
    token,
  });

  // Get the balance for the pot that funds were withdrawn from
  const fromPotBalance = await colonyClient.getPotBalance.call({
    potId: fromPot,
    token,
  });

  // Check out the log to see the pot balance
  console.log('Pot Balance (From): ' + fromPotBalance.balance.toNumber());

  // Get the balance for the pot that funds were deposited into
  const toPotBalance = await colonyClient.getPotBalance.call({
    potId: toPot,
    token,
  });

  // Check out the log to see the pot balance
  console.log('Pot Balance (To): ' + toPotBalance.balance.toNumber());

  // Return the balance for the pot that funds were deposited into
  return toPotBalance;

};

// An example using the createToken method
module.exports.createToken = async (networkClient, name, symbol) => {

  // Create a new ERC20 token
  const tokenAddress = await networkClient.createToken({ name, symbol });

  // Check out the logs to see the token address
  console.log('Token Address: ' + tokenAddress);

  // Return the address
  return tokenAddress;

};

// An example using the createColony method
module.exports.createColony = async (networkClient, tokenAddress) => {

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

// An example using the setTokenOwner method
module.exports.setTokenOwner = async (colonyClient, colonyAddress) => {

    // Set the token owner to be the colony contract. This will allow us to mint
    // and claim tokens using the colonyClient, which will then allow us to fund
    // domains and tasks within our colony.
    await colonyClient.token.setOwner.send({ owner: colonyAddress });

    // Get the owner of the token
    const tokenOwner = await colonyClient.token._contract.owner();

    // Check out the logs to see the owner of the token
    console.log('Token Owner: ' + tokenOwner);

    // Return tokenOwner
    return tokenOwner;
};

// An example using the mintTokens method
module.exports.mintTokens = async (colonyClient, amount) => {

  // Mint tokens
  await colonyClient.mintTokens.send({ amount: new BN(amount) });

  // Get the total supply of tokens
  const totalSupply = await colonyClient.token.getTotalSupply.call();

  // Check out the logs to see the total supply of tokens
  console.log('Total Supply Amount: ' + totalSupply.amount);

  // Return the total supply of tokens
  return totalSupply;

};

// An example using the claimColonyFunds method
module.exports.claimColonyFunds = async (colonyClient, token) => {

    // Claim funds for our colony from our token
    await colonyClient.claimColonyFunds.send({ token });
  
    // Get the pot balance of our colony
    const potBalance = await colonyClient.getPotBalance.call({
      potId: 1,
      token,
    });
  
    // Check out the logs to see the pot balance of our colony
    console.log('Colony Pot Balance: ' + potBalance.balance);
  
    // Return the pot balance of our colony
    return potBalance;
  
};

// An example using the createColony method
module.exports.createTask = async (colonyClient, domainId, specification) => {
  // Initialise the Extended Colony Protocol
  await ecp.init();

  // Create a specification hash for the task
  const specificationHash = await ecp.saveHash(specification);

  // Stop the Extended Colony Protocol
  await ecp.stop();

  // Create a task and get the taskId from the event data
  const { eventData: { taskId } } = await colonyClient.createTask.send({
    specificationHash,
    domainId,
  });

  // Get our new task using the taskId
  const task = await colonyClient.getTask.call({ taskId });

  // Check out the logs to see our new task
  console.log('Task:', task);

  // Return our new task
  return task;

};

// An example using the setTaskDueDate operation
module.exports.setTaskDueDate = async (colonyClient, taskId, dueDate) => {

    // Start the operation to set the dueDate for the given task
    const operation = await colonyClient.setTaskDueDate.startOperation({
      taskId,
      dueDate,
    });
  
    // Check out the logs to see the operation required signees
    console.log('Required Signees:', operation.requiredSignees);
  
    // Serialize the operation into JSON format
    const operationJSON = operation.toJSON();
  
    // Save the operation to our mock database
    DATABASE.setTaskDueDateOperationJSON = operationJSON;
  
};

module.exports.finalizeTask = async (colonyClient, taskId) => {

  // Finalize the given task
  await colonyClient.finalizeTask.send({ taskId });

  // Get the updated task
  const updatedTask = await colonyClient.getTask.call({ taskId });

  // Check out the logs to see the updated task
  console.log('Updated Task:', updatedTask);

  // Return the updated task
  return updatedTask;

};

// An example using the submitTaskDeliverable method 
module.exports.submitTaskDeliverable = async (colonyClient, taskId, deliverable) => {

    // Initialise the Extended Colony Protocol
    await ecp.init()
  
    // Create a deliverable hash for the task
    const deliverableHash = await ecp.saveHash(deliverable)
  
    // Stop the Extended Colony Protocol
    await ecp.stop()
  
    // Submit the deliverable for the given task
    await colonyClient.submitTaskDeliverable.send({
      taskId,
      deliverableHash,
    });
  
    // Get the updated task
    const updatedTask = await colonyClient.getTask.call({ taskId });
  
    // Check out the logs to see the updated task
    console.log('Updated Task:', updatedTask);
  
    // Return the updated task
    return updatedTask;
  
};

// An example using the submitTaskWorkRating method
module.exports.submitTaskWorkRating = async (colonyClient, taskId, role, rating) => {

    // Set salt value
    const salt = 'secret';
  
    // Set rating value
    const value = rating;
  
    // Generate a secret for the work rating
    const { secret } = await colonyClient.generateSecret.call({
      salt,
      value,
    });
  
    // Submit task work rating for the given task and role
    const submitTaskWorkRating = await colonyClient.submitTaskWorkRating.send({
      taskId,
      role,
      secret,
    });
  
    // Get the task work ratings
    const taskWorkRatings = await colonyClient.getTaskWorkRatings.call({
      taskId,
    });
  
    // Check out the logs to see the updated task work ratings
    console.log('Task Work Ratings:', taskWorkRatings);
  
    // Return the updated task work ratings
    return taskWorkRatings;
  
};

// An example using the revealTaskWorkRating method
module.exports.revealTaskWorkRating = async (colonyClient, taskId, role, rating) => {

    // Set salt value
    const salt = 'secret';
  
    // Set rating value
    const value = rating;
  
    // Generate a secret for the task work rating
    const { secret } = await colonyClient.generateSecret.call({
      salt,
      value,
    });
  
    // Reveal the task work rating
    await colonyClient.revealTaskWorkRating.send({
      taskId,
      role,
      rating,
      salt,
    });
  
    // Get the task work ratings
    const taskWorkRatings = await colonyClient.getTaskWorkRatings.call({
      taskId,
    });
  
    // Check out the logs to see the task work ratings
    console.log('Task Work Ratings:', taskWorkRatings);
  
    // Return the task work ratings
    return taskWorkRatings;
  
};



