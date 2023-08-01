
const registrationFunction = (req,res, sbdb, bcrypt) => {
    const {name, email, password} = req.body;
    var hash = bcrypt.hashSync(password);

    sbdb.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(justRegisteredEmail => {
                return trx('users').returning('*')
                    .insert({
                        email: justRegisteredEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then( user => {
                        res.json(user[0]);
                    })                    
            })
            .then(trx.commit)
            .catch(trx.rollback)        
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    registrationFunction: registrationFunction
};


//  以下是建database以前做後端時的code
//  encrypt the password with bcrypt package
/*     bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
}); */

// database.user.push({
//     id:'125',
//     name: name,
//     email: email,
//     password: password,
//     entries: 0,
//     joined: new Date()
// })

// let length = database.user.length;
//  顯示給user看它剛剛push、新增進去的資料
// res.json(database.user[length-1]);
