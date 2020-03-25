// dependencies
const express = require('express');
const bodyParser = require('body-parser');

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

// routes
app.use('/', routes.views);
app.use('/api/v1/', routes.api);

// -------------------------------------- START SERVER -------------------------------------- //

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));




