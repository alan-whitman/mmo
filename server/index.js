const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();

const app = express();
const { CONNECTION_STRING: cs, SERVER_PORT: port, SESSION_SECRET: ss } = process.env;

massive(cs).then(db =>  {
    app.set('db', db);
    console.log('db is connected');
});

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: ss,
    cookie: {
        maxAge: 999999
    }
}))



app.listen(port, () => console.log(port));