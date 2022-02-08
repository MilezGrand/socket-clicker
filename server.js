const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
const cors = require('cors');

let mainScore = 10;

app.use(cors());
app.use(express.json());

app.get('/getscore', (req, res) => {
    res.send(mainScore.toString());
});

// app.post('/setscore', (req,res) => {
//     const { coins } = req.body;
//     mainScore = coins + 1;
//     console.log(mainScore)
//     res.send();
// });

io.on('connection', (socket) => {
    socket.join('clicker');
    socket.on('scoreChanged', ( data ) => {
        mainScore = data + 1;
        socket.to('clicker').emit('update', mainScore);
    });

    console.log('New connection ' + socket.id);
})

server.listen(8000, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Server is ready');
});