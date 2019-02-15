const express = require('express');           // import express framework
const app     = express();                    // instantiating express
const http    = require('http');              // import http package
const server  = http.Server(app);             // Create server
const io      = require('socket.io')(server); // set socket.io with server
const uuid    = require('uuid');              // Used to generate unique string for room id

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
    roomId = uuid.v4().slice(0,8).toUpperCase();
  } while(!!io.sockets.adapter.rooms[roomId]);
  res.json({ roomId });
});

// GET check if room id to join exists
app.get('/checkRoomId', (req, res) => {
  let roomExists = true;
  if(!io.sockets.adapter.rooms[req.query.roomId]){
    roomExists = false;
  }
  res.json({ roomExists });
});

// All URL sends user to home page
app.get('/*', (req, res) => {
  res.redirect('/');
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
  socket.on('leave', (roomId, leaveData) => {
    socket.broadcast.to(roomId).emit('leave', leaveData);
  });

  // Logic for when a user changes map's background
  socket.on('map', (roomId, mapData) => {
    socket.broadcast.to(roomId).emit('map', mapData);
  });

  // Logic for when a user changes map's background
  socket.on('delMap', (roomId, mapId) => {
    socket.broadcast.to(roomId).emit('delMap', mapId);
  });

  // Logic for when a user adds or edits a
  socket.on('mapChar', (roomId, mapCharData) => {
    socket.broadcast.to(roomId).emit('mapChar', mapCharData);
  });

  // Logic for when a user adds or edits a character to place on the map
  socket.on('removeMapChar', (roomId, mapId, charId) => {
    socket.broadcast.to(roomId).emit('removeMapChar', mapId, charId);
  });

  // Logic for when a user changes map's background
  socket.on('geo', (roomId, geoData) => {
    socket.broadcast.to(roomId).emit('geo', geoData);
  });

  // Logic for when a user changes map's background
  socket.on('delGeo', (roomId, geoId, mapId) => {
    socket.broadcast.to(roomId).emit('delGeo', geoId, mapId);
  });

  // Logic for when a user edits shared notes
  socket.on('editNote', (roomId, notes) => {
    socket.broadcast.to(roomId).emit('editNote', notes);
  });

  // Logic for when a user locks a note
  socket.on('lockNote', (roomId, userId) => {
    socket.broadcast.to(roomId).emit('lockNote', userId);
  });

  // Logic for when a user unlocks a note
  socket.on('unlockNote', (roomId) => {
    socket.broadcast.to(roomId).emit('unlockNote');
  });

  // Logic to send room expiration information
  socket.on('roomExpire', (roomId, roomExpireSetting) => {
    socket.broadcast.to(roomId).emit('roomExpire', roomExpireSetting);
  });

});
