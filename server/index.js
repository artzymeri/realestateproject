const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());

db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'realestateproject'
})

const port = 8080;

app.post('/insertnewestate', (req, res) => {
    const sqlInsert = 'INSERT INTO estates_table (title, meter, location, images, posting, type, characteristics, price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const {title, meter, location, images, posting, type, characteristics, price, description} = req.body;
    const imagesStringArray = JSON.stringify(images);

    db.query(sqlInsert, [title, meter, location, imagesStringArray, posting, type, characteristics, price, description] ,(error, result) => {
        if(error){
            console.log(error)
        }else {
            console.log('Success!')
        }
    })
});

app.post('/editestate/:estateId' , (req, res)=> {
    const {estateId} = req.params;
    const sqlUpdate = 'UPDATE estates_table SET title=?, meter=?, location=?, images=?, posting=?, type=?, characteristics=?, price=?, description=? WHERE id=?';
    const {title, meter, location, images, posting, type, characteristics, price, description} = req.body;
    const imagesStringArray = JSON.stringify(images);

    db.query(sqlUpdate, [title, meter, location, imagesStringArray, posting, type, characteristics, price, description, estateId], (error, result)=> {
        if(error) {
            console.log(error);
        } else {
            console.log('Successful Edit of Estate!');
        }
    })
})

app.post('/changepassword/:usernameofUser' , (req, res)=> {
    const {usernameofUser} = req.params;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sqlUpdate = 'UPDATE users_table SET password=? WHERE username=?';

    db.query(sqlUpdate, [hashedPassword, usernameofUser], (error, result)=> {
        if(error) {
            console.log(error);
        } else {
            console.log('Successful Change of Password!');
        }
    })
});


app.post('/changedetails/:usernameofUser' , (req, res)=> {
    const {usernameofUser} = req.params;
    const {name, surname, number} = req.body;
    const sqlUpdate = 'UPDATE users_table SET name=?, surname=?, number=? WHERE username=?';

    db.query(sqlUpdate, [name, surname, number, usernameofUser], (error, result)=> {
        if(error) {
            console.log(error);
        } else {
            console.log('Successful Change of Details!');
        }
    })
});


app.post('/changeprofilepicture/:usernameofUser' , (req, res)=> {
    const {usernameofUser} = req.params;
    const profilepicture = req.body.profilepicture;
    const sqlUpdate = 'UPDATE users_table SET profilepicture=? WHERE username=?';

    db.query(sqlUpdate, [profilepicture, usernameofUser], (error, result)=> {
        if(error) {
            console.log(error);
        } else {
            console.log('Successful Change of Profile Picture!');
        }
    })
})



app.delete('/deleteestates/:estateId', (req, res)=> {
    const {estateId} = req.params;
    sqlDelete = 'DELETE FROM estates_table WHERE id=?'
    db.query(sqlDelete, [estateId], (error, result)=>{
        if(error){
            console.log(error);
        }else {
            console.log('Successful Deletion of Estate!')
        }
    });
});

app.delete('/deleteregisterrequest/:agentId', (req, res)=>{
    sqlDelete = 'DELETE FROM users_request_table WHERE id = ?';
    const {agentId} = req.params;
    db.query(sqlDelete, [agentId], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            console.log('Agent Register Request Deleted Successfully!')
        }
    })
});

app.get('/get', (req, res)=> {
    const sqlSelect = 'SELECT * FROM estates_table';
    db.query(sqlSelect, (error, result) => {
        res.send(result);
    });
});

app.get('/getestatedetails/:index', (req, res)=>{
    const sqlSelect = 'SELECT * FROM estates_table WHERE id=?';
    const {index} = req.params;
    db.query(sqlSelect, [index], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            console.log('NICE!')
            res.send(result)
        }
    }) 
})

app.get('/getusername/:username', (req, res) => {
    const sqlSelect = 'SELECT username FROM users_table WHERE username = ?';
    const usernameToCheck = req.params.username;

    db.query(sqlSelect, [usernameToCheck], (error, results) => {
        if (results.length > 0) {
            res.send({success: true});
        } else {
            res.send({success: false});
        }
        
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sqlSelect = 'SELECT username, password, name, surname, number, profilepicture, role FROM users_table WHERE username = ?';
    db.query(sqlSelect, [username], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            res.status(500).json({ message: 'An error occurred' });
        }

        if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
            res.json({ message: 'Invalid credentials' });
        } else {
            const userId = results[0].id;
            const usernameofUser = results[0].username;
            const profilePicture = results[0].profilepicture;
            const name = results[0].name;
            const surname = results[0].surname;
            const number = results[0].number;
            if (results[0].role === 'admin') {
                const adminToken = jwt.sign({ username : username, role: 'admin' }, secretKey, { expiresIn : '1h' } )
                res.json({adminToken, usernameofUser, profilePicture, name, surname, number, userId });
            } else {
                const agentToken = jwt.sign({ username: username, role: 'agent' }, secretKey, { expiresIn : '1h' });
                res.json({agentToken, usernameofUser, profilePicture, name, surname, number});
            }
        }
    });
});



app.post('/register' , (req, res)=>{
    const sqlInsert = 'INSERT INTO users_table (username, password, name, surname, number, profilepicture) VALUES (?, ?, ?, ?, ?, ?)';
    const {username, password, name, surname, number, profilepicture} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10); 

    db.query(sqlInsert, [username, hashedPassword, name, surname, number, profilepicture], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            console.log(result);
        }
    })
});


app.get('/registerrequests', (req, res)=>{
    const sqlSelect = 'SELECT * FROM users_request_table'
    db.query(sqlSelect, (error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    })
});

app.get('/getrequestusername/:username', (req, res)=>{
    const { username } = req.params
    const sqlSelect = 'SELECT * FROM users_request_table WHERE username = ?';
    db.query(sqlSelect, [username] ,(error, result)=>{
        if(error){
            console.log(error)
        }else if(result.length > 0){
            res.json({success : true})
        }else {
            res.json({ success: false })
        }
    })
})

app.post('/requestregister', (req, res)=> {
    const {username, password, name, surname, number, profilePicture} = req.body;
    const sqlInsert = 'INSERT into users_request_table (username, password, name, surname, number, profilepicture) VALUES (?, ?, ?, ?, ?, ?)';
    const sqlSelect = 'SELECT * FROM users_table WHERE username = ?';
    db.query(sqlSelect, [username], (error, result)=>{
         if(result.length > 0) {
            res.json({ success : true })
         }else{
            db.query(sqlInsert, [username, password, name, surname, number, profilePicture], (error, result)=> {
                if(error){
                    console.log(error)
                }else{
                    console.log('Register Request Successful!')
                }
            })
         }
    })
})


app.listen(port, ( )=>{
    console.log(`Server is running in http://localhost:${port}`)
});