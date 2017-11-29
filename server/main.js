var express = require('express');
var parser = require('body-parser');
var Feature = require('./models/Feature.js');
require('./database.js');

var app = new express();

app.get('/', function(req, res){
    res.render('./../app/index.ejs', {});
}).use(express.static(__dirname + './../.tmp'))
    .listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

require('./routes/features.js')(app);

module.exports = app;
