var mongoose = require('mongoose');

var FeatureSchema = {
    platform:String,
    featureName:String,
    branchName:String,
    buildURL:String,
    timestamp:String
};

var Feature = mongoose.model('Feature', FeatureSchema, "Features");

module.exports = Feature;
