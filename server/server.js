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
  let room_id = '';
  do {
    room_id = Math.random().toString().slice(2,8);
  } while(!!io.sockets.adapter.rooms[room_id]);
  res.json({result: room_id});
});

// Place Holder socket.io logic
io.on('connection', (socket) => {
  console.log('A user has connected to the socket.io server!');

  // Logic for when a new user joins the room
  // socket.on('join', (room_id) => {
  //   for (let room in socket.rooms){
  //     socket.leave(room);
  //   }
  //   socket.join(room_id);
  // });

});
