const signinFunction = (req, res, sbdb, bcrypt) => {
    sbdb.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            return sbdb.select('*').from('users')
                .where('email','=',req.body.email)
                .then(validUserInfo => {
                    // console.log(validUserInfo);
                    res.json(validUserInfo[0]);
                })
                .catch(err => res.status(400).json('Password is correct, but somehow unable to load the user'))
        } else {
            res.status(400).json('Invalid password');
        }
    })
    .catch( err => res.status(400).json('Invalid user email'));
}

module.exports = {
    signinFunction: signinFunction
}
