var mongoose = require('mongoose');

var FeatureSchema = {
    platform:String,
    featureName:String,
    branchName:String,
    preProdBuildURL:String,
    prodBuildURL:String,
    timestamp:String
};

var Feature = mongoose.model('Feature', FeatureSchema, "Features");

module.exports = Feature;
