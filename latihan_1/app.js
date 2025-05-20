const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { title } = require('process');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// menggunakan query params...
app.get(`/products` , (req,res) => {
    // endPoint akan menjadi seperti ini localhost:3000/products?category=kesehatan
    const {id} = req.query;
    const products = [
            {id: 1 , name:"Rokok" },
            {id: 2 , name:"Sabun" },
            {id: 3 , name:"Mobil" },
            {id: 4 , name:"Qur'an" }
        ]
    if(id) {
        const data = products.filter(item => item.id == id);
        if(data.length > 0) {
            res.json({data})
        }else {
            res.json({
                status: "error",
                message: `Product dengan ID : ${id} belum tersedia`
            })
        }
    }else {
        res.json({products})
    }
})


module.exports = app;
