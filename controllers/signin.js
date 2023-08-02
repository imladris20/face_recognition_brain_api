const signinFunction = (req, res, sbdb, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password ){
        return res.status(400).json('incorrect form submission');
    }

    sbdb.select('email','hash').from('login')
    .where('email','=',email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            return sbdb.select('*').from('users')
                .where('email','=',email)
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
