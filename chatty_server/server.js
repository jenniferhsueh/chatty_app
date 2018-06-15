const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
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
  console.log('Client connected');
  let counter = wss.clients.size;
  // console.log(counter);

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({type: "count", connection: counter}))
  });

  ws.on('message', (data) => {
    let msgData = JSON.parse(data);
    console.log(msgData)
    msgData.id = uuidv4();
    msgData.connection = 0;
    console.log(counter)
    // console.log("connect", msg.connection)
    switch(msgData.type) {
      case "postMessage":
        msgData.type = "incomingMessage";
        break;
      case "postNotification":
        msgData.type = "incomingNotification";
        break;
      default:
      console.log(msgData);
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msgData.type);
    }

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(msgData));
    });
  })
 
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
      let counter = wss.clients.size;
    // console.log(counter);
  
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({type: "count", connection: counter}))
    }) 
  });
});
