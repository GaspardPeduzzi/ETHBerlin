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
    const colonyInfos = await initialize(network1);

    // Create a colonyClient for the first eth keypair
    const colonyClient = await helper.getColonyClient(network1,colonyInfos.colony.id);

    // Create 12 tasks
    const task1 = await initTask(network1,colonyClient,"QmdvhDERnS9vdcof81anRtvncqQ2wriJweKuMc5bySunS4");
    const updatedTask1= await helper.submitTaskDeliverable(colonyClient, task1.id, "QmZz49wnmpjhpkYd5r964JLFDf195xPZ6Hb9b8sSFsYzYp");
    const ratedTask1 = await initRating(colonyClient, task1.id,3);


    const task2 = await initTask(network1,colonyClient,"QmW2B1MCQjzpn28YALWWH4umhUhiydHQBXutLWokkMaRVU");
    const updatedTask2= await helper.submitTaskDeliverable(colonyClient, task2.id, "QmXQtwZNvsnSxErBzLoB6BHJGNDgMCLrg1w9Dcz5HsfQhf");
    const ratedTask2 = await initRating(colonyClient, task2.id,2);


    // const task3 = await initTask(network1,colonyClient,"QmZ3C9LrRnYhoNzn8VQegjcdeBP8xZycdHXWSn4i8grqCR");
    // const task4 = await initTask(network1,colonyClient,"QmbBeCwU657yqjwj4b5dtfZyU6thCNdQxT45s4FXxrG6wM");
    const task5 = await initTask(network1,colonyClient,"QmPUMfTxyX7mjSUSTQihevG1ZpmgtFi2CcfCpsNCVLuqqr");
    const updatedTask5= await helper.submitTaskDeliverable(colonyClient, task5.id, "QmTq94FVYCZDHf8EZdcgUa7Mrmp5pKotLozBFycxLWMhPj");

    const task6 = await initTask(network1,colonyClient,"QmZnVwfMarT5v6AYxE5E877mZwvRQx26CCDYV3jdwFR1x9");
    const updatedTask6= await helper.submitTaskDeliverable(colonyClient, task6.id, "Qmb52QUp8mR8LbkpxxaDHDVb8xhspUgnjBu7Js9FaYzTDr");

    const task7 = await initTask(network1,colonyClient,"Qmet3S5YcFhQ7fbsAPEZcxYuPtYyPTxe3rzPzWvrgDR5ij");
    const updatedTask7= await helper.submitTaskDeliverable(colonyClient, task7.id, "QmSuFn8rykDNyaoca78bijN2PHVoXtc9a9UtUm4845pyeP");

    // const task8 = await initTask(network1,colonyClient,"QmcpzpccdDHup5AvcmxiuDsa92bydNQbPzyGgf2wHRwSE3");
    // const task9 = await initTask(network1,colonyClient,"QmVvobNNtqGMZYnqRSfiXvwdCf99SjFpT61nTsZQF9RPBJ");
    const task10 = await initTask(network1,colonyClient,"QmeYnPBBoPNR2oqqm3kXwKTV3nvjr4cBUeKXsa4v1nffSt");
    const task11 = await initTask(network1,colonyClient,"QmcmCDKKzNCm4AdKZ2SVQKuDF7YLvnb9v3rV52e5TbGfdm");
    // const task12 = await initTask(network1,colonyClient,"QmUGZwUUkXYKjxZgtsSttWkJsRSWSsXyiTsbMiJT7gwJ6b");

    // Set worker and submit a work for the 9 first tasks
    // const updatedTask3= await helper.submitTaskDeliverable(colonyClient, task3.id, "QmbiTdhiQN7ZA5SMV4vKS2mRTe7Ja3pYkv8Y3VftMhvxzN");
    // const updatedTask4= await helper.submitTaskDeliverable(colonyClient, task4.id, "QmUzEGnoWikoHQmAQEb3hnWcFeq8Z1uJGnfTCxEiPTSUdG");
    // const updatedTask8= await helper.submitTaskDeliverable(colonyClient, task8.id, "Qma2D3RopSHPb1hrHTcy12nQMTc21L4uDqfJjRW4L4drZE");
    // const updatedTask9= await helper.submitTaskDeliverable(colonyClient, task9.id, "QmSP6jaZQq8wb4Wp5EXBFNhDgjYwXtEAvyui9bPmsy5UDF");

    // Submit and reveal rating for the first 4 taks
    // const ratedTask3 = await initRating(colonyClient, task3.id,1);
    // const ratedTask4 = await initRating(colonyClient, task4.id,3);

}

basic()
  .catch(console.log)
