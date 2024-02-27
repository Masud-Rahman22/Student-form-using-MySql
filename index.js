const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware Here
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get('/',(req,res)=>{
    const sql = 'SELECT * FROM `student`';
    db.query(sql, (err,data)=>{
        res.send(data)
        if(err){
            res.send("error")
        }
    })
})
app.get('/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM `student` WHERE id=?';
    db.query(sql,[id], (err,data)=>{
        res.send(data)
        if(err){
            res.send("error")
        }
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql = 'DELETE FROM `student` WHERE ID=?';
    const id = req.params.id;
    db.query(sql,[id], (err,data)=>{
        res.send(data)
        if(err){
            res.send("error")
        }
    })
})

app.put("/update/:id",(req,res)=>{
    
    const sql = "update student set `Name` = ? , `Email` = ? WHERE ID = ?"
    const id = req.params.id;
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [...values, id], (err,data)=>{
        res.send(data)
        if(err){
            console.log("error")
        }
    })
})

app.post('/create',(req,res)=>{
    const sql = "INSERT INTO `student`(`Name`, `Email`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err,data)=>{
        res.send(data)
        if(err){
            console.log("error")
        }
    })
})

app.get('/', (req, res) => {
    res.send('Project is running properly')
})

app.listen(port, () => {
    console.log(`Project is running properly on port ${port}`);
})