require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Gagal konek ke database:', err);
  } else {
    console.log('Koneksi ke database sukses!');
  }
});

module.exports = db;
