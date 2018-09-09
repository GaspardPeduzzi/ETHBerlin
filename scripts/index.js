const basic = async () => {
  const connectNetwork = require('./connect');
  const initialize = require('./initColony');
  const createTask = require('./initTasks');
  const createWork = require('./initWorks');
  
  const network1 = await connectNetwork(0);
//   const network2 = await connectNetwork(1);
//   const network3 = await connectNetwork(2);

//  const colony = await initialize(network1);

var colony = {
    address: "0x2459C6109D80BFA50E03A2FB7cE9C0dBb0b28250",
    id: 27,
}
  const task1 = await createTask(network1,colony,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
//   const task2 = await createTask(network2,colony,"Louis", "Frontend");
//   const task3 = await createTask(network3,colony,"Jean", "Frontend");

  const work = await createWork(network1, colony, task1.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
//   await createWork(network2, colony, task2.id, {title:"Second Article written", description:"Hello World ! This is another submitted article"});
}

basic()
  .catch(console.log)
