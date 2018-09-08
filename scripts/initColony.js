const BN = require('bn.js');
const ecp = require('./helpers/ecp');
const helper = require('./helpers/functions');


const initialize = async (networkClient) => {
  const token = await helper.createToken(networkClient, 'OpenTimes', 'OPT');
  const colony = await helper.createColony(networkClient, token);
  const colonyClient = await helper.getColonyClient(networkClient,12);

  const tokenOwner= await helper.setTokenOwner(colonyClient, colony.address);
  const totalSupply = await helper.mintTokens(colonyClient, 1000000);
  const potBalance = await helper.claimColonyFunds(colonyClient, token);
  const domain = await helper.addDomain(colonyClient, networkClient, 1);


  const response = await colonyClient.setAdminRole.send({user:"0x05efa8f42a667da6328f527244050c5990bc305c"});
    console.log(response.successful);
  const tmp = await colonyClient.setAdminRole.send({user:"0x1e73ba52ac846ab3931c68f0aa9bfaa7130623b6"});
  console.log(tmp.successful);

 // const newBalancePot = await moveFundsBetweenPots( colonyClient,1,domain.potId,30,token);

 // Create some sample tasks
// const task = await createTask(colonyClient, domain.id,{title: 'New Task Title', description: 'New Task Description'});

const skill_review = await helper.addGlobalSkill(networkClient, 1);
const skill_publish = await helper.addGlobalSkill(networkClient, 2);
const skill_propose = await helper.addGlobalSkill(networkClient, 3);

var tomorrow = new Date();
tomorrow.setDate(today.getDate()+1);
const updatedTask = helper.setTaskDueDate(colonyClient,task.id, tomorrow);

const finishedTask = helper.finalizeTask(colonyClient,task.id);


  return true;
};

module.exports = initialize;
