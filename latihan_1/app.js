const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { title } = require('process');

// middleware
const {globalError , notFound} = require('./app/middleware/error-handler');
const {NotFound } = require('./app/errors/NotFound')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route
// menampilkan hello world...
// get (path , (request , response))...
app.get("/" , (_,res) => {
    // method send akan mengembalikan string...
    res.send("Hello World");
})

app.get("/test" , (_,res) => {
    // method json akan mengembalikan json...
    res.json({
        text: "Hello World",
    });
})

// method pada express ada GET POST PUT DELETE...
// GET
app.get("/todos" , (_,res) => {
    res.json({
        todos: [
            {title: 'Makan' , desc: 'Makan bang'},
            {title: 'Minum' , desc: 'Minum bang'},
            {title: 'Tidur' , desc: 'Tidur bang'},
        ]
    });
})

// POST
app.post("/todos" , (_,res) => {
    res.send("Todo created");
})

// PUT
app.put("/todos" , (_,res) => {
    res.send("Todo updated");
})

// DELETE
app.delete("/todos" , (_,res) => {
    res.send("Todo deleted");
})

// Dinamis Routes...\
// untuk route dinamis gunakan :params(bebas namanya)...
// lalu panggil dengan req.params.id...
app.get(`/todos/:id` , (req,res) => {
    // lakukan destruck agar lebih mudah mengakses...
    const {id} = req.params;
    res.send(`Ini adalah product dengan ID : ${id}`)
})

// EndPoin /student...
app.get("/student" , (req, res)=> {
    const {id,category} = req.query;

    // simulasi data...
    const data = [
        {id:1 , name:'Zumal' , category:'student'},
        {id:2 , name:'Farhan' , category:'student'},
        {id:3 , name:'Fadil' , category:'oldStudent'},
        {id:4 , name:'Sena' , category:'student'},
        {id:5 , name:'Rizal' , category:'oldStudent'},
    ];
    
    // melakukan filter untuk category dan id dari student
    const result = data.filter(item => item.category == category || item.id == id); 

    // menggunakn throw new (customError) untuk mengembalikan error dari backEnd...
    if(!result.length && (category || id)) throw new NotFound("Student not found")
    
    // mengembalikan response berupa json...
    return res.json((category || id) ? result : data)
})

// menangkap error yang terjadi di BackEnd...
app.use(globalError)

// app use , merupakan middleware untuk semua jadi selama route tidak ada di atas maka akan menampilkan error custom kita
app.use(notFound)

module.exports = app;
