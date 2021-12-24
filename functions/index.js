const functions = require("firebase-functions");
const express = require("express");
const stripe = require("stripe")(
    "sk_test_51K2cO2SEaIpOQdUw7HfQsVP9AurswWOxAM59bsJ38nkIW7bRiDdcOya12wNKgmzVEZC2Lwuwtl3cqheHoZqtXFA000CO4jXf4r"
);
// Access-Control-Allow-Origin: 'http://localhost:3000'
// App config

const app = express();
const { response } = require("express");
const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


// API


// app.use(cors(corsOptions));
// app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
// }); 

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());


// API routes
app.get('/', (request, response) => response.status(200).send
('hello world'))

app.post('/payments/create', async (request, response) =>{
    const total = request.query.total;

    console.log('Payment request received... total >>', total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: "usd",
    });
    //ok - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});




// Listen command

exports.api = functions.https.onRequest(app)

// http://localhost:5001/challenge-83a2a/us-central1/api