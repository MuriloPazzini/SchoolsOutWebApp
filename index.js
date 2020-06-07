const express = require('express');
const app = express();
var path = require('path')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/book/read', function (req, res) {
    res.sendFile(__dirname + '/pages/book-read.html');
});

app.get('/quiz/answer', function (req, res) {
    res.sendFile(__dirname + '/pages/quiz-answer.html');
});

app.use(express.static("."));
var server = app.listen('3000', () => console.log('Server Up and running'));