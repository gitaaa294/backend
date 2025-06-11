const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'aksesoris_gisyaglow_db'
});

connection.connect(err => {
  if(err) throw err;
  console.log('konek');
});

module.exports = connection;
