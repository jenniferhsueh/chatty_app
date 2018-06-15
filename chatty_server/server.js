const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let counter = wss.clients.size;
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({type: "count", connection: counter}))
  });

  ws.on('message', (data) => {
    let msgData = JSON.parse(data);
    msgData.id = uuidv4();
    switch(msgData.type) {
      case "postMessage":
        msgData.type = "incomingMessage";
        break;
      case "postNotification":
        msgData.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown event type " + msgData.type);
    }

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(msgData));
    });
  })
 
  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    let counter = wss.clients.size;
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({type: "count", connection: counter}))
    }) 
  });
});
