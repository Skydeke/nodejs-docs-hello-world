// ***************************************************************************
// Bank API code from Web Dev For Beginners project
// https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/7-bank-project/api
// ***************************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const crypto = require('crypto');
const pkg = require('./package.json');
const fs = require('fs');


// App constants
const port = process.env.PORT || 3000;
const apiPrefix = '/api';

// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
app.options('*', cors());

// ***************************************************************************

// Configure routes
const router = express.Router();

// Hello World for index page
app.get('/', function (req, res) {
  return res.send("Hello World!");
})
// Add a transaction to a specific account
router.post('/file', (req, res) => {
  let body = req.body
  console.log(body)
  fs.appendFile('database.db', body.text + "\n", function (err) {
    if (err) {
      console.log(err);
      return res.status(505).json("Cant open file.");
    }
    console.log("The file was saved!");
  });
  return res.status(200).json("Success.");
});

router.get('/file', function (req, res) {
  fs.readFile('database.db', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});

// Add 'api` prefix to all routes
app.use(apiPrefix, router);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

