// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const PORT = 4000;

// database

const db = require('./models');

//require routes
const routes = require('./routes');

// middleware
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/base',
  }),
  secret: process.env.SESSION_SECRET || 'Supercalifragiliticex[eali34899849838020iljsljsojh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // Two weeks
  }
}));

// routes
app.use('/', routes.views);
app.use('/api/v1/', routes.api);

// -------------------------------------- START SERVER -------------------------------------- //

app.listen(process.env.PORT || 3000, () => console.log(`Server running at http://localhost:${PORT}`));




