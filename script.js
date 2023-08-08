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

/* const sbdb = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl : {rejectUnauthorized: false},
        host: process.env.DATABASE_HOST,
        port : 5432,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_DB
    }
}); */

const sbdb = knex({
    client: 'pg',
    connection: {
        connectionString: 'postgres://face_recognition_brain_database_user:eOmWIXU0Nwt1M3KdRLngZjdKoqVeDzz9@dpg-cj887akl975s7384ua30-a.singapore-postgres.render.com/face_recognition_brain_database',
        ssl : {rejectUnauthorized: false},
        host: 'dpg-cj887akl975s7384ua30-a',
        port : 5432,
        user : 'face_recognition_brain_database_user',
        password : 'eOmWIXU0Nwt1M3KdRLngZjdKoqVeDzz9',
        database : 'face_recognition_brain_database'
    }
});

/* const sbdb = knex({
    client: 'pg',
    connection: {
        //  localhost 的網址就是127.0.0.1
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'love0313',
        database : 'smart-brain'
    }
}); */

//  32-36行若uncomment掉可以檢查knex有沒有運作正常
//  console.log(sbdb.select('*').from('users'));
//  sbdb.select('*').from('users').then(data => {
//     console.log(data);
//  });

//  引入express功能
app.use(express.json());
app.use(cors());

//  step 0
app.get('/', (req,res) => {res.send ("It is working.") });

//  step 1
app.post('/signin', (req,res) => {signin.signinFunction(req, res, sbdb, bcrypt)});

//  step 2
//  把script的變數如sbdb, bcrypt 傳進去function裡面的動作叫做dependency injection
app.post('/register', (req,res) => {register.registrationFunction(req,res,sbdb,bcrypt)});

//  step 3
app.get('/profile/:id', (req,res) => {profile.profileFunction(req,res, sbdb)});

//  step 4
app.put('/image', (req,res) => {image.imageFunction(req, res, sbdb)});
app.post('/imageurl', (req,res) => {image.handleAPICall(req, res)});

// const PORT = process.env.PORT;

// // app.listen(PORT || 3000, ()=>{
// //     console.log(`Face recognition brain API is running on port ${PORT}.`);
// // });

// // console.log(PORT);

app.listen(3000, ()=>{
    console.log("Face recognition brain API is running on port 3000.");
});