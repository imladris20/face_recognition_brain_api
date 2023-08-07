const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

//  20-55行是Clarifai API 的模板code
const returnRequestOptions = (imageUrl) => {
  
  const PAT = 'e429cbb5db254b2482b6ebbe4d76f656';
  const USER_ID = 'imladris20';       
  const APP_ID = 'face_recognition_brain';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}

const handleAPICall = (req,res) =>{
    
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnRequestOptions(req.body.input))
    .then(response => response.json())
    .then(result => {
        console.log("This is result:", result);
        res.json(result);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

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
    imageFunction: imageFunction,
    handleAPICall: handleAPICall
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


