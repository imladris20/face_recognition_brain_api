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

app.get('/',(req,res) => {
    res.send(database.user);
})

app.post('/signin', (req,res) => {
    if (req.body.email === database.user[0].email &&
        req.body.password === database.user[0].password ){
        res.json('log in success');
    } else {
        res.status(400).json('error logging in');
    }
})

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

app.listen(3000, ()=>{
    console.log("This app is running on port 3000.");
});

//  API Building (End Points)Order
/*
--> res = this is working
/signin --> POST = success or fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/