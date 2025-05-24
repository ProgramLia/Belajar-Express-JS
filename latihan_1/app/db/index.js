// melakukan koneksi dengan database (MongoDB dengan menggunakan ODM (Object Dokument Model) biar apa ?  biar mudah...heheh)
const mogoose = require("mongoose");

// panggil variable dari .env 
const { db_url } = require("../config");

// lalu pakai...jangan lupa tambahkan pesan success dan error....
mogoose.connect(db_url).then(()=> console.log("success connect to mongoDB")).catch(err => console.log(err));

// karena kode ini ditulis bukan langsung di server maka harus di eksport
// mongoose.connection..
const db = mogoose.connection;
module.exports = db;