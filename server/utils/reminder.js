const moment = require('moment');
const User = require('./../models/user');
const sendEmail = require('./email');

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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

module.exports.runAt9AM = () => {
  const targetTime = moment('09:00:00', 'HH:mm:ss');

  setInterval(async () => {
    const now = moment();

    if (now.format('HH:mm:ss') === targetTime.format('HH:mm:ss')) {
    //   console.log('Code running at 09:00 AM every day');
    //   // replace the console.log statement above with your own code that should run at 09:00 AM
        
    const users = await User.find({"grant": false}).sort({ "lastLoggedIn": 1 });
    // console.log(users);

    let remindUsers = [];

    for(var i in users) {
        // console.log(users[i]);
        if(isDateOlderThan2Days(users[i].lastLoggedIn)) remindUsers.push(users[i]);
        else break;
    }

    for(var i in remindUsers) {

        console.log(remindUsers[i].name.split(" ")[0]);
        const message = `Dear ${remindUsers[i].name.split()[0]}, <br>
        You have not logged into your system from more than 2 days now. This reminder is to inform you to login to College's WiFi`;
        sendEmail(remindUsers[i].email, "Reminder Email - Suraksha Your Campus Buddy !!!", message);

        if(i != 0 && i % 9 == 0) await sleep(300000);

    }

    // console.log(remindUsers);


}
  }, 1000);
}