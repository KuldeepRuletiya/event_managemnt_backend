var mysql = require('mysql');
// var config = mysql.createConnection({
//   host: 'localhost',
//   user: 'kuldeep',
//   password: 'Admin@123',
//   port: 3306,
//   database: 'event_management'
// });

var config = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'x5k12AXED4',
  password: 'sp155T9AOz',
  port: 3306,
  database: 'x5k12AXED4'
});

config.connect(function (err) {
  if (err) {
    console.log("Database Connection Error", err);
    throw err
  };
    console.log("Database Connected Successfully!..");
})

module.exports = config