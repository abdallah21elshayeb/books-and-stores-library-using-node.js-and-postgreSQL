let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let noteRoutes = require('./Routes/routeNote');
let storeRoutes = require('./Routes/storeRoute');
let bookRoutes = require('./Routes/bookRoute');
let userRoutes = require('./Routes/userRoute');
let loginRoutes = require('./Routes/loginRoute');
let uploadRoutes = require('./Routes/uploadRoute');
let exportRoutes = require('./Routes/exportRoute');
let paypalRoutes = require('./Routes/paypalRoute');
let app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { Server } = require('socket.io');
app.use(cors());

// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(urlencodedParser);

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// paypal directory

app.get('/payment', function (req, res) {
  res.sendFile(__dirname + '/payment.html');
});
// success page
app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/success.html');
});
// error page
app.get('/err', (req, res) => {
  res.sendFile(__dirname + '/error.html');
});

app.use('/api/v1', noteRoutes);
app.use('/api/v1', storeRoutes);
// app.use('/api/v1', bookRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', loginRoutes);
app.use('/api/v1', uploadRoutes);
app.use('/api/v1', exportRoutes);
app.use('/api/v1', paypalRoutes);

app.get('/', function (req, res) {
  res.send('server started.....');
});

const server = app.listen(3000, () => {
  console.log('server start');
});

const io = new Server(server);

io.on('connection', function (socket) {
  console.log('Connected successfully to the socket ...');

  setInterval(function () {
    let news = getNews();
    socket.emit('news', news);
  }, 5000);

  socket.on('my other event', function (data) {
    console.log(data);
  });
});

function getNews() {
  let length = Math.floor(Math.random() * 21);
  let news = [];
  for (let i = 0; i < length; i++) {
    let val = {
      id: i,
      title: 'The cure of the Sadness is to play Video games' + i,
      date: new Date(),
    };
    news.push(val);
  }
  return news;
}

module.exports = app;
