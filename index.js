const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "bentbmttn3rs7jod9vtt-mysql.services.clever-cloud.com",
    user: "ujbs26sy2bhj8yzn",
    password: "EgrDwpTBmEiJywmaHows",
    database: "bentbmttn3rs7jod9vtt"
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM `student`';
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.send(data);
        }
    });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM `student` WHERE id=?';
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.send(data);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM `student` WHERE ID=?';
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting data from database");
        } else {
            res.send(data);
        }
    });
});

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const id = req.params.id;
    const values = [req.body.name, req.body.email, id];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating data in database");
        } else {
            res.send(data);
        }
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO `student`(`Name`, `Email`) VALUES (?)";
    const values = [req.body.name, req.body.email];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating data in database");
        } else {
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Project is running properly on port ${port}`);
});
