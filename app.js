var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var noteRoutes = require('./Routes/routeNote');
var storeRoutes = require('./Routes/storeRoute');
var bookRoutes = require('./Routes/bookRoute');
var app = express();

app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use('/api/v1', noteRoutes);
app.use('/api/v1', storeRoutes);
app.use('/api/v1', bookRoutes);
app.get('/', function (req, res) {
  res.send('server started.....');
});

app.listen(3000, () => {
  console.log('server start');
});
