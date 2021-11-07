const express = require('express');

const bodyParser = require('body-parser');

// create express app
const app = express();

const cors = require('cors');
// Setup server port
const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
  extended: true,
}))

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var route = require('./routes/route');

app.use('/',route);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});