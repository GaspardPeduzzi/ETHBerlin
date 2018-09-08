const BN = require('bn.js');
const ecp = require('./helpers/ecp');



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
  const tx = await colonyClient.createTask.send({
    specificationHash,
    domainId,
  },
  {
      gasPrice: 40000000000
  }
  );
  const { eventData: { taskId } } = tx;
  console.log(tx);
  console.log(taskId);


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



const createSamples = async (networkClient, colony, title, description) => {

    const colonyClient = await getColonyClient(networkClient,colony.id);
    // const domain = await addDomain(colonyClient, networkClient, 1);
   // const newBalancePot = await moveFundsBetweenPots( colonyClient,1,domain.potId,30,token);
    
   // Create sample tasks
    const task = await createTask(colonyClient, 1,{title: title, description: description});
    console.log('New task created');
  
  // Assing new date to the task
//   var tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate()+1);
//   const updatedTask = setTaskDueDate(colonyClient,task.id, tomorrow);

//   // close task
//   const finishedTask = finalizeTask(colonyClient,task.id);

  
    return task;

};

module.exports = createSamples;
