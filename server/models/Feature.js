var mongoose = require('mongoose');

var FeatureSchema = {
    featureName:String,
    branchName:String,
    buildURL:String,
    timestamp:String
};

var Feature = mongoose.model('Feature', FeatureSchema, "Features");

module.exports = Feature;
