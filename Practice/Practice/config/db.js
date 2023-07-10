var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "gst"
})

conn.connect(() => {
  console.log("Connected to DB");   // connected!
})

module.exports= conn;