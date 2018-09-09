const basic = async () => {
  const connectNetwork = require('./connect');
  const initialize = require('./initColony');
  const initTask = require('./initTasks');
  const initRating = require('././initRating');
  const helper = require('./helpers/functions');
  
  const network1 = await connectNetwork(0);
//   const network2 = await connectNetwork(1);
//   const network3 = await connectNetwork(2);

    // Create a colony
    const colony = await initialize(network1);

    // Create a colonyClient for the first eth keypair
    const colonyClient = await helper.getColonyClient(network1,colony.id);

    // Create 12 tasks
    const task1 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task2 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task3 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task4 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task5 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task6 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task7 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task8 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task9 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task10 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task11 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");
    const task12 = await initTask(network1,colonyClient,"Is Blockchain the future ?", "Write about ethereum, its founders, the technology and the potential it represents.");

    // Set worker and submit a work for the 9 first tasks
    const updatedTask1= await helper.submitTaskDeliverable(colonyClient, task1.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask2= await helper.submitTaskDeliverable(colonyClient, task2.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask3= await helper.submitTaskDeliverable(colonyClient, task3.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask4= await helper.submitTaskDeliverable(colonyClient, task4.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask5= await helper.submitTaskDeliverable(colonyClient, task5.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask6= await helper.submitTaskDeliverable(colonyClient, task6.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask7= await helper.submitTaskDeliverable(colonyClient, task7.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask8= await helper.submitTaskDeliverable(colonyClient, task8.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});
    const updatedTask9= await helper.submitTaskDeliverable(colonyClient, task9.id, {title:"First Article written", description:"Hello World ! This is a submitted article"});

    // Submit and reveal rating for the first 4 taks
    const ratedTask1 = await initRating(colonyClient, task1.id,3);
    const ratedTask2 = await initRating(colonyClient, task2.id,2);
    const ratedTask3 = await initRating(colonyClient, task3.id,1);
    const ratedTask4 = await initRating(colonyClient, task4.id,3);

}

basic()
  .catch(console.log)
