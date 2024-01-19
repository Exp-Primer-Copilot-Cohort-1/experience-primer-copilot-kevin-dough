// Create web server
// 1. npm init
// 2. npm install express --save
// 3. node comments.js

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comment', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.send(data);
        }
    });
});

app.post('/comment', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal server error');
                } else {
                    res.send('Add comment successfully');
                }
            });
        }
    });
});

app.listen(3000);