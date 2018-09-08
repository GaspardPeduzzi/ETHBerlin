const basic = async () => {
  const connectNetwork = require('./connect');
  const initialize = require('./initColony');
  const createTask = require('./initTasks');



  const network1 = await connectNetwork(0);
  const network2 = await connectNetwork(1);
  const network3 = await connectNetwork(2);

  const tmp2 = await initialize(network1);


 var colony = {
    address: "0x7dC6f0d0dE9e9AD519BeB029BC37d82Ec6e2d223",
    id: 12
 };

  const task1 = await createTask(network1,colony,"Demo Article", "Hello Rinkeby !");
  const task2 = await createTask(network2,colony,"Article Ethereum timeline", "TBD");
  const task3 = await createTask(network3,colony,"Article on EOS : what is the point ? ", "I am not sure you need 4B$ for that");

}

basic()
  .catch(console.log)
