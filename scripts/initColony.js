const BN = require('bn.js');
const ecp = require('./helpers/ecp');
const helper = require('./helpers/functions');


const initialize = async (networkClient) => {
  const token = await helper.createToken(networkClient, 'OpenTimes', 'OPT');
  const colony = await helper.createColony(networkClient, token);
  const colonyClient = await helper.getColonyClient(networkClient,colony.id);
  const tokenOwner= await helper.setTokenOwner(colonyClient, colony.address);
  const totalSupply = await helper.mintTokens(colonyClient, 1000000);
  const potBalance = await helper.claimColonyFunds(colonyClient, token);
  const domain = await helper.addDomain(colonyClient, networkClient, 1);
  

//   const owner1 = await colonyClient.setAdminRole.send({user:"0x05efa8f42a667da6328f527244050c5990bc305c"});
//   console.log(owner1.successful);
//   const owner2 = await colonyClient.setAdminRole.send({user:"0x1e73ba52ac846ab3931c68f0aa9bfaa7130623b6"});
//   console.log(owner2.successful);

 // const newBalancePot = await moveFundsBetweenPots( colonyClient,1,domain.potId,30,token);

 // Create some sample tasks

  return colony;
};

module.exports = initialize;
