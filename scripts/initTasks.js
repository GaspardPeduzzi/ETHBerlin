const BN = require('bn.js');
const ecp = require('./helpers/ecp');
const helper = require('./helpers/functions');


const createSamples = async (networkClient,colonyClient, title, description) => {
    // const domain = await addDomain(colonyClient, networkClient, 1);
   // const newBalancePot = await moveFundsBetweenPots( colonyClient,1,domain.potId,30,token);
    
   // Create sample tasks
    const task = await helper.createTask(colonyClient, 1,{title: title, description: description});
    // await colonyClient.setTaskRoleUser.send({
    //     taskId: task.id,
    //     role: 'MANAGER',
    //     user: colonyClient.contract.address,
    //   });

    //   console.log("manager");
      

    //   console.log("worker");
  
//   Assing new date to the task
//   var tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate()+1);
//   console.log(tomorrow);
//   const updatedTask = await helper.setTaskDueDate(colonyClient,task.id, tomorrow);
//   console.log( await updatedTask);

  // close task
    // const finishedTask = await helper.finalizeTask(colonyClient,task.id);
    // console.log(await finishedTask);


        console.log("task id :"+task.id);
        console.log("user: "+networkClient._contract.signer.address);

    const op = await colonyClient.setTaskManagerRole.startOperation({taskId: task.id, user: networkClient._contract.signer.address});
    console.log('Op started for manager assignement');
    const x = await op.sign();
    console.log('Op signed for manager assignement');
    const y = await x.send();
    console.log('Op sent for manager assignement');


    const op3 = await colonyClient.setTaskWorkerRole.startOperation({taskId: task.id, user: networkClient._contract.signer.address});
    console.log('Op started for worker assignement');
    const x3 = await op3.sign();
    console.log('Op signed for worker assignement');
    const y3 = await x3.send();
    console.log('Op sent for worker assignement');






  
    return task;

};

module.exports = createSamples;