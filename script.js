//  API Building (End Points)Order
/*
--> 
/0. res = this is working
/1. signin --> POST = success or fail
/2. register --> POST = user
/3. profile/:userID --> GET = user
/4. image --> PUT --> user
*/

const express = require('express');
const bcrypt = require('bcrypt-nodejs')
// https://www.npmjs.com/package/bcrypt-nodejs

const app = express();
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');

const sbdb = knex({
    client: 'pg',
    connection: {
        //  localhost 的網址就是127.0.0.1
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'love0313',
        database : 'smart-brain'
    }
});

//  32-36行若uncomment掉可以檢查knex有沒有運作正常
//  console.log(sbdb.select('*').from('users'));
//  sbdb.select('*').from('users').then(data => {
//     console.log(data);
//  });

//  引入express功能
app.use(express.json());
app.use(cors());

/* const database = {
    user: [
        {
            id:'123',
            name: 'Polien',
            email: 'polien@gmail.com',
            password: 'love0313',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'Carpenter',
            email: 'carpenter@gmail.com',
            password: 'love2950',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'987',
            hash: "",
            email: "polien@gmail.com"
        }

    ]
} */

//  step 0
// app.get('/',(req,res) => {
//     res.send(database.user);
// })

//  step 1
app.post('/signin', (req,res) => {

    // // Load hash from your password DB.
    // bcrypt.compare(req.body.password, "$2a$10$bLZwHfo8ux5LkCr4p2iWAOro.DvnI4Re6X7leWdRTSOJZlzt/ifhy", function(err, res) {
    //     console.log("first login (should be true)", res);
    // });
    // bcrypt.compare("wrong_password", "$2a$10$bLZwHfo8ux5LkCr4p2iWAOro.DvnI4Re6X7leWdRTSOJZlzt/ifhy", function(err, res) {
    //     console.log("second login (should be false)", res);
    // });

/*     if (req.body.email === database.user[0].email &&
        req.body.password === database.user[0].password ){
        res.json(database.user[0]);
    } else {
        res.status(400).json('error logging in');
    } */

    sbdb.select('email','hash').from('login')
        .where('email','=',req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                return sbdb.select('*').from('users')
                    .where('email','=',req.body.email)
                    .then(validUserInfo => {
                        console.log(validUserInfo);
                        res.json(validUserInfo[0]);
                    })
                    .catch(err => res.status(400).json('Password is correct, but somehow unable to load the user'))
            } else {
                res.status(400).json('Invalid password');
            }
        })
        .catch( err => res.status(400).json('Invalid user email'));
})

//  step 2
//  把script的變數如sbdb, bcrypt 傳進去function裡面的動作叫做dependency injection
app.post('/register', (req,res) => {register.registrationFunction(req,res,sbdb,bcrypt)});

//  step 3
app.get('/profile/:id', (req,res) => {
    
    const {id} = req.params
    // let found = false;

    // database.user.forEach(user => {
    //     if(user.id === id){
    //         found = true;
    //         return res.json(user);
    //     }
    // })

    // if(found === false){
    //     res.status(400).json("not found");
    // }

    sbdb.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                res.json(user[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
})

//  step 4
app.put('/image', (req,res) => {

    const {id} = req.body;

    sbdb('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))

/*     let found = false;

    database.user.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })

    if(found === false){
        res.status(400).json("not found");
    } */



})

// //  encrypt the password with bcrypt package
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, ()=>{
    console.log("Face recognition brain API is running on port 3000.");
});