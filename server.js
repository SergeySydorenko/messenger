const express = require('express');
const connectDB = require('./config/db');

const path = require('path');
const app = express();
//const io = require('socket.io');

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    (value = 'Origin, Content-Type, x-auth-token')
  );
  next();
});

app.use('/chat', require('./routes/api/chat'));
app.use('/auth', require('./routes/api/auth'));
app.use('/reg', require('./routes/api/reg'));

app.get('/', (req, res) => res.send('API Running'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const Message = require('./models/Message');
const User = require('./models/User');

const io = require('socket.io')(app);

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
  console.log("Connection ON");
  connection.push(socket);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected");
  })
})