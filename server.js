const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./api/users');
const cors = require('cors');

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./sslcerts/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('./sslcerts/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', User);

httpsServer = https.createServer(credentials, app);

mongoose.connect(
    "mongodb://127.0.0.1/users",
    { useNewUrlParser: true }
).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
        app.listen(4000, () => {
            console.log('Server running on http://172.18.70.33:4000');
        })

        httpsServer.listen(5176, ()=>{
            console.log('Server running on https://172.18.70.33:5176');
          });
    },
    err => { /** handle initial connection error */
        err & console.log(err) & console.log('Error connecting to db');
    }
);

