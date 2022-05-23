const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./config/db');

const app = express();

dbConnection();

app.use(cors());

app.use( express.json() );

app.use('/api/user', require('./route/users'));

app.use('/api/priority', require('./route/priorities'));

app.use('/api/bill', require('./route/bills'));

app.listen(process.env.PORT, () => {
    console.log(`SERVIDOR EN PUERTO ${process.env.PORT}`);
});
