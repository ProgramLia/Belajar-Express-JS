// Pastikan sudah menginstall dotenv....(dengan perintah npm i dotenv@14.0.0 / liat di dokumentasi)...
// gunakan dotenv untuk mengakses variable di .env
const dotenv = require("dotenv");
dotenv.config();

// wajib lakukan export biar bisa dipake woiii....
module.exports = {
    db_url: process.env.DB_URL,
};

