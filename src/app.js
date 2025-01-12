const express = require('express');
const session = require('express-session'); // creates and manages a session for each user. The session data is stored on the server, while a session ID is sent to the client in a cookie.
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes');
require('./passport-config'); // load Passport config

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.static('src')); // or 'public' if you move static files there
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // added to handle JSON payloads
app.use(session({
     secret: 'secretKey', 
     resave: false, 
     saveUninitialized: false 
}));
app.use(passport.initialize()); // initializes Passport for authentication.
app.use(passport.session()); // integrates Passport with the session. It ensures that once a user is authenticated, their information is stored in the session and used for subsequent requests.

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
