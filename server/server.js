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

// All URL sends user to home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

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

// All URL sends user to home page
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
    if (err){
      res.redirect('/');
    }
  });
});







// Place Holder socket.io logic
io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });

  // Logic for when a new user joins the room
  socket.on('join', (roomId, content) => {
    for (let room in socket.rooms){
      socket.leave(room);
    }
    socket.join(roomId);
    socket.to(roomId).emit('join', content);
  });

  // Logic for when a user sends a chat
  socket.on('chat', (roomId, content) => {
    socket.broadcast.to(roomId).emit('chat', content);
  });

  // Logic for when a user creates a new character or edits a character
  socket.on('char', (roomId, content) => {
    socket.broadcast.to(roomId).emit('char', content);
  });

  // Logic for when a user removes a character
  socket.on('delChar', (roomId, charId) => {
    socket.broadcast.to(roomId).emit('delChar', charId);
  });

  // Logic for when a user creates a new character or edits a character
  socket.on('user', (roomId, content) => {
    socket.broadcast.to(roomId).emit('user', content);
  });

  // Logic for when a user creates a new character or edits a character
  socket.on('delUser', (roomId, content) => {
    socket.broadcast.to(roomId).emit('delUser', content);
  });

  // Logic for setting a user as a host
  socket.on('newHost', (roomId, id) => {
    socket.broadcast.to(roomId).emit('newHost', id);
  });

  // Logic for when a user leaves a room
  socket.on('leave', (roomId, id) => {
    socket.broadcast.to(roomId).emit('leave', id);
  });

  // Logic for when a user changes map's background
  socket.on('mapImage', (roomId, imageData) => {
    socket.broadcast.to(roomId).emit('mapImage', imageData);
  });

  // Logic for when a user adds or edits a
  socket.on('mapChar', (roomId, charData) => {
    socket.broadcast.to(roomId).emit('mapChar', charData);
  });

  // Logic for when a user adds or edits a character to place on the map
  socket.on('removeMapChar', (roomId, charId) => {
    socket.broadcast.to(roomId).emit('removeMapChar', charId);
  });

});
