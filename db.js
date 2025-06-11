require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'shortline.proxy.rlwy.net',
  port: 46067,
  user: 'root',
  password: 'KBYkFCSjFLbbcKxjZMJOVwEkdfdAKSrf',
  database: 'railway'
});


connection.connect(err => {
  if (err) throw err;
  console.log('Koneksi ke database berhasil!');
});

module.exports = connection;
