const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

app.use(express.static('public'));

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set Content Security Policy header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'"); // Adjust as needed
  next();
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle adding shifts
    socket.on('addShift', (shift) => {
        // Process the shift data
        // Emit the updated shift data to all connected clients
        io.emit('shiftAdded', shift);
    });

    // Handle any other socket events here

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
