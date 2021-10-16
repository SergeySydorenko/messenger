const express = require('express');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
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

// Socket io section START
/*const Message = require('./models/Message');
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
*/
// Socket io section END

//app.get('/', (req, res) => res.send('API Running'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true
  }
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const Message = require('./models/Message');
const User = require('./models/User');
const config = require('config');

users = [];
connections = [];

io.on('connection', function(socket) {
  console.log("Connection ON");
  connections.push(socket);

  socket.on('send message', async (data) => {
    let decoded = jwt.verify(data.token, config.get('jwtSecret'));
    let newMessage = new Message({
      author: decoded.user.id,
      text: data.message,
      date: Date.now()
    });
    newMessage = await newMessage.save();
    let addedMessage = await Message.findById(newMessage._id).populate('author', '-password');
    socket.broadcast.emit('add message', {message: addedMessage});
    socket.emit('add message', {message: addedMessage});
  })

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected");
  })
})

//const PORT = process.env.PORT || 5000;

//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

