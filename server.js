// dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// database

const db = require('./models');

//routes

 const routes = require('./routes');

// middleware
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

// routes
// app.get('/', (req, res) => {
// 	res.status(302);
// })


 app.use('/', routes.views);
// app.use('/api/v1/', routes.api);

// -------------------------------------- START SERVER -------------------------------------- //

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));




