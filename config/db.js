let mysql = require('mysql')

let pool = mysql.createPool({
  connectionLimit : 20,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'leapro_db'
})


module.exports = pool;

