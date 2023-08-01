const imageFunction = (req, res, sbdb) => {
    
    const {id} = req.body;

    sbdb('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    imageFunction: imageFunction
}


//  old code
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


