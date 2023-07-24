const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("This is working!");
})

app.listen(3000, ()=>{
    console.log("This app is running on port 3000.");
});

//  API Building Order
/*
--> res = this is working
/signin --> POST = success or fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/