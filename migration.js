conn = new Mongo();
db = conn.getDB("feature");

db.Features.find().forEach(function(feature){
    feature.preProdBuildURL = feature.buildURL;
    feature.prodBuildURL = feature.buildURL;
    db.Features.save(feature);
});

db.Features.update({}, {$unset: { "buildURL": "" } }, false, true);
