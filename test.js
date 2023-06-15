var date = new Date();
var epoch = date.getTime();
console.log(epoch)
// converting back to date-time
var initial_date = new Date(epoch);
console.log(initial_date)

require('dotenv').config();
console.log(process.env.DYNAMODB_TABLE)