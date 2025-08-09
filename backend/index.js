const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "northtrek"
})

connection.connect((err) => {
    if (err) {
        console.error("MySQL Connection is Error ", err);
        return;
    }
    console.log("Connected to MySQL")
})



// API endpoint
app.post('/api/insert', (req, res) => {
    const { account_name, account_password } = req.body;

    const query = "INSERT INTO accounts(account_name, account_password) VALUES(?, ?)";
    
    connection.query(query, [account_name, account_password], (err, result) => {
        if (err) {
            console.error("Error inserting data ", err);
            res.status(500).json({ error: "internal server error"})
        }

        res.json({
            msg: "data inserted successfully",
            insertId: result.insertId
        })
    });
})

app.listen(port, () => {
    console.log("Server is running on port: ", port);
})