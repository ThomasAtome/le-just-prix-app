const http = require('http');
const express = require('express');
const path = require('path');

PORT = 80;

// Create app and server
const app = express();
const server = http.createServer(app);

// Define static files
app.use(express.static(path.join(__dirname, 'public')));

// Define template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define express body parser
app.use(express.urlencoded({extended: false}));

// Add all the routes
app.use(require('./routes/login'));
app.use(require('./routes/game'));

// Define default route
app.use((req, res) => {
    res.redirect('/login');
})

// Call and init the socket
require('./socket')(server);

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
