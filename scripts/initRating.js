const helper = require('./helpers/functions');

const initRating = async (colonyClient, taskId,rating) => {

    const taskRating = await helper.submitTaskWorkRating(colonyClient,taskId, 'WORKER',rating);
    console.log("Rating submitted");
    const revealedRating = await helper.revealTaskWorkRating(colonyClient,taskId,'WORKER',rating);
    console.log('Rating revealed');

    return revealedRating;
}

module.exports = initRating;