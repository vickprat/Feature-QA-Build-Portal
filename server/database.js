var mongoose = require('mongoose');
var Feature = require('./models/Feature.js');

mongoose.connect('mongodb://localhost/feature', function(){
    console.log("connected.");
});
