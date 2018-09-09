const basic = async () => {
  const connectNetwork = require('./connect');
  const initialize = require('./initColony');
  const initTask = require('./initTasks');
  const initRating = require('././initRating');
  const helper = require('./helpers/functions');
  
  const network1 = await connectNetwork(0);
//   const network2 = await connectNetwork(1);
//   const network3 = await connectNetwork(2);

//  const colony = await initialize(network1);

var colony = {
    address: "0x2459C6109D80BFA50E03A2FB7cE9C0dBb0b28250",
    id: 27,
}
    const colonyClient = await helper.getColonyClient(network1,colony.id);

    const task1 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
//   const task2 = await createTask(network2,colony,"Louis", "Frontend");
//   const task3 = await createTask(network3,colony,"Jean", "Frontend");

    const updatedTask= await helper.submitTaskDeliverable(colonyClient, task1.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});

    const rating = await initRating(colonyClient, task1.id,3);
}

basic()
  .catch(console.log)
