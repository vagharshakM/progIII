var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function generator(matLen, gr, grE, pr, bu, buE) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grE; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < bu; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < buE; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}
var matrix = generator(20, 10, 10, 10, 10, 10);

io.sockets.emit('send matrix', matrix);
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var buysArr = []
var buysEaterArr = []

Grass = require("./Grass");
grassEater = require("./GrassEater");
buys = require("./Buys");
buysEater = require("./BuysEater");
predator = require("./Predator");

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[x][y] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[x][y] == 2) {
                let grE = new GrassEater(x, y)
                grassEaterArr.push(grE);
            }
            else if (matrix[x][y] == 3) {
                let pr = new predator(x, y)
                predatorArr.push(pr);
            }
            else if (matrix[x][y] == 4) {
                let bu = new buys(x, y)
                buysArr.push(bu);
            }
            else if (matrix[y][x] == 5) {
                let buE = new buysEater(x, y)
                buysEaterArr.push(buE);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (let j in predatorArr) {
        predatorArr[j].mul()
        predatorArr[j].eat()
    }
    for (var i in buysArr) {
        buysArr[i].mul();
    }
    for (let j in buysEaterArr) {
        buysEaterArr[j].mul()
        buysEaterArr[j].eat()
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000);

io.on('connection', function () {
    createObject(matrix)
})