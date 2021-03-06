const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const PORT = process.env.PORT || 3000;
const db = require("./server/models");
const mongoose = require('mongoose');

const path = require('path');

// Config to the database and load models
const MONGODB_URI = process.env.MONGODB_URI || config.dbUri;
// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect( MONGODB_URI ,
  {
    useMongoClient: true
  }
);
const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'server/static', 'index.html'));
});
// start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
