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
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

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

//  step 0
app.get('/', (req,res) => {res.send (database.users) });

//  step 1
app.post('/signin', (req,res) => {signin.signinFunction(req, res, sbdb, bcrypt)});

//  step 2
//  把script的變數如sbdb, bcrypt 傳進去function裡面的動作叫做dependency injection
app.post('/register', (req,res) => {register.registrationFunction(req,res,sbdb,bcrypt)});

//  step 3
app.get('/profile/:id', (req,res) => {profile.profileFunction(req,res, sbdb)});

//  step 4
app.put('/image', (req,res) => {image.imageFunction(req,res, sbdb)});
app.post('/imageurl', (req,res) => {image.handleAPICall(req,res)});

app.listen(3000, ()=>{
    console.log("Face recognition brain API is running on port 3000.");
});