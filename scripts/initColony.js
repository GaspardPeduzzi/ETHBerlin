const BN = require('bn.js');
const ecp = require('./helpers/ecp');

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

// An example using the getColonyClient method
const getColonyClient = async (networkClient, colonyId) => {

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

// An example using the setTokenOwner method
const setTokenOwner = async (colonyClient, colonyAddress) => {

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
const mintTokens = async (colonyClient, amount) => {

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
const claimColonyFunds = async (colonyClient, token) => {

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

// An example using the addDomain method
const addDomain = async (colonyClient, networkClient, parentDomainId) => {

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
const moveFundsBetweenPots = async (colonyClient, fromPot, toPot, amount, token) => {

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

// An example using the createColony method
const createTask = async (colonyClient, domainId, specification) => {
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
const setTaskDueDate = async (colonyClient, taskId, dueDate) => {

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

const initialize = async (networkClient) => {
//   const token = await createToken(networkClient, 'OpenTimes', 'OPT');
//   const colony = await createColony(networkClient, token);
  const colonyClient = await getColonyClient(networkClient,12);

//   const tokenOwner= await setTokenOwner(colonyClient, colony.address);
//   const totalSupply = await mintTokens(colonyClient, 1000000);
//   const potBalance = await claimColonyFunds(colonyClient, token);
//   const domain = await addDomain(colonyClient, networkClient, 1);


  const response = await colonyClient.setAdminRole.send({user:"0x05efa8f42a667da6328f527244050c5990bc305c"});
console.log(response.successful);
  const tmp = await colonyClient.setAdminRole.send({user:"0x1e73ba52ac846ab3931c68f0aa9bfaa7130623b6"});
  console.log(tmp.successful);

 // const newBalancePot = await moveFundsBetweenPots( colonyClient,1,domain.potId,30,token);

 // Create some sample tasks
// const task = await createTask(colonyClient, domain.id,{title: 'New Task Title', description: 'New Task Description'});

// const skill_review = await addGlobalSkill(networkClient, 1);
// const skill_publish = await addGlobalSkill(networkClient, 2);
// const skill_propose = await addGlobalSkill(networkClient, 3);

// const finishedTask = finalizeTask(colonyClient,task.id);

// var tomorrow = new Date();
// tomorrow.setDate(today.getDate()+1);

// const updatedTask = setTaskDueDate(colonyClient,task.id, tomorrow);

  return true;
};

module.exports = initialize;
