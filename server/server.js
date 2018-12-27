const express = require('express');           // import express framework
const app     = express();                    // instantiating express
const http    = require('http');              // import http package
const server  = http.Server(app);             // Create server
const io      = require('socket.io')(server); // set socket.io with server

const portNo  = process.env.PORT || 3000; // set port number

const path = require('path');            // import path object

const bodyParser = require('body-parser');        // import body-parser
app.use(bodyParser.urlencoded({extended: true})); // use body-parser
app.use(bodyParser.json());                       // parse body to json

// Set express listener at port 3000
server.listen(portNo, () => {
  const serverStartTimestamp = new Date().toLocaleString();

  console.log('\n--- SERVER STATUS ---');
  console.log('Server Start Date:', serverStartTimestamp);

  console.log('The Server is up and running!');
  console.log(`Access the website at: http://localhost:${portNo}`);
});

// Set path for file to ./dist
app.use(express.static(path.join(__dirname, '../build')));

// GET new room id to host a new room
app.get('/newRoomId', (req, res) => {
  let roomId = '';
  do {
    roomId = Math.random().toString().slice(2,10);
  } while(!!io.sockets.adapter.rooms[roomId]);
  res.json({ roomId });
});

// GET check if room id to join exists
app.get('/checkRoomId', (req, res) => {
  console.log(req.query);
  let roomExists = true;
  if(!io.sockets.adapter.rooms[req.query.roomId]){
    roomExists = false;
  }
  res.json({ roomExists });
});

// Place Holder socket.io logic
io.on('connection', (socket) => {
  console.log('User has connected');

  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });

  // Logic for when a new user joins the room
  socket.on('join', (roomId) => {
    for (let room in socket.rooms){
      socket.leave(room);
    }
    console.log(`User will join room ${roomId}`);
    socket.join(roomId);
  });

  // Logic for when a user sends a chat
  socket.on('chat', (content) => {
    console.log('CHAT DATA HAS BEEN RECEIVED!');
    console.log(content);
    io.to(content.roomId).emit('chat', content);
  })


});
