const moment = require('moment');
const User = require('./../models/user');

function isDateOlderThan2Days(dateString) {

    console.log(dateString);

    if(dateString === "") return true;

    // Convert the date string to a Date object
    const date = new Date(dateString);
  
    // Get the current date
    const now = new Date();
  
    // Calculate the difference between the current date and the given date in milliseconds
    const differenceInMs = now - date;
  
    // Calculate the number of milliseconds in 2 days
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
  
    // Check if the difference is greater than or equal to 2 days in milliseconds
    return differenceInMs >= twoDaysInMs;
  }

module.exports.runAt9AM = () => {
  const targetTime = moment('11:24:30', 'HH:mm:ss');

  setInterval(async () => {
    const now = moment();

    if (now.format('HH:mm:ss') === targetTime.format('HH:mm:ss')) {
    //   console.log('Code running at 09:00 AM every day');
    //   // replace the console.log statement above with your own code that should run at 09:00 AM
        
    const users = await User.find({}).sort({ "lastLoggedIn": 1 });
    // console.log(users);

    let remindUsers = [];

    for(var i in users) {
        console.log(users[i]);
        if(isDateOlderThan2Days(users[i].lastLoggedIn)) remindUsers.push(users[i]);
        else break;
    }

    console.log(remindUsers);


}
  }, 1000);
}