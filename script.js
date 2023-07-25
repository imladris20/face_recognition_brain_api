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
const app = express();

app.use(express.json());

const database = {
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
    ]
}

//  step 0
app.get('/',(req,res) => {
    res.send(database.user);
})

//  step 1
app.post('/signin', (req,res) => {
    if (req.body.email === database.user[0].email &&
        req.body.password === database.user[0].password ){
        res.json('log in success');
    } else {
        res.status(400).json('error logging in');
    }
})

//  step 2
app.post('/register', (req,res) => {
    const {name, email, password} = req.body;
    database.user.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    let length = database.user.length;
    //  顯示給user看它剛剛push、新增進去的資料
    res.json(database.user[length-1]);
})

//  step 3
app.get('/profile/:id', (req,res) => {
    
    const {id} = req.params
    let found = false;

    database.user.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })

    if(found === false){
        res.status(400).json("not found");
    }
})

//  step 4
app.post('/image', (req,res) => {

    const {id} = req.body;

    let found = false;

    database.user.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })

    if(found === false){
        res.status(400).json("not found");
    }
})

app.listen(3000, ()=>{
    console.log("This app is running on port 3000.");
});

