// Import the Clarifai gRPC-based client
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const USER_ID = 'imladris20';
const APP_ID = 'face_recognition_brain';

// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

// Construct the stub object for accessing all the Clarifai API functionality
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.API_PAT);

const handleAPICall = (req,res) => {
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: req.body.input, allow_duplicate_url: true } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }
    
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }
    
            // Since we have one input, one output will exist here
            const output = response.outputs[0];

            console.log('Output is:', output);
    
            // console.log("Predicted concepts:");

            // for (const concept of output.data.concepts) {
            //     console.log(concept.name + " " + concept.value);
            // }

            res.json(response)
        }
    );
};

const imageFunction = (req, res, sbdb) => {
    
    const {id} = req.body;

    sbdb('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    imageFunction,
    handleAPICall
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


