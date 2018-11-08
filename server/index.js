const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const massive = require('massive');
require('dotenv').config();
const port = 4800;

// const { CONNECTION_STRING: cs, SERVER_PORT: port, SESSION_SECRET: ss } = process.env;

// massive(cs).then(db =>  {
//     app.set('db', db);
//     console.log('db is connected');
// });

// app.use(bodyParser.json());
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: ss,
//     cookie: {
//         maxAge: 999999
//     }
// }))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(port, () => console.log(port));