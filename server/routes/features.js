module.exports = function(app) {
    var Feature = require('./../models/Feature.js');
    
    app.route('/api/features')
    .get(function(req, res){
        Feature.find(function(error, doc){
            res.send(doc);
        });
    })
    
    app.route('/api/registerFeature')
    .post(function(req, res){
        Feature.findOne({branchName:req.body.branchName, platform:req.body.platform}, function(error, doc){
            if (doc) {
                res.status(403);
                res.send({message:"Duplicate feature found!!"});
            } else {
                var feature = new Feature(req.body);
                feature.save(function(err, data){
                    res.status(200);
                    res.send({message:"Feature registered successfully!!"});
                });
            }
        });
    })
    
    app.route('/api/addBuild')
    .post(function(req, res){
        Feature.findOne({branchName:req.body.branchName, platform:req.body.platform}, function(error, doc){
            if (doc) {
                for (var key in req.body){
                    doc[key] = req.body[key];
                }
                doc['timestamp'] = new Date().toLocaleString(); 
                doc.save();
                res.status(200);
                res.send({message:"Build added successfully!!"});
            } else {
                res.status(403);    
                res.send({message:"Feature not found!!"});
            }
        });
    })
    
    app.route('/api/removefeature/:platform/:branchName')
    .delete(function(req, res){
        Feature.findOne({branchName:req.params.branchName, platform:req.params.platform}, function(error, doc){
            if (doc) {
                doc.remove();
                res.status(200);
                res.send({message:"Feature removed successfully!!"});
            } else {
                res.status(403);
                res.send({message:"Feature not found!!"});
            }
        });
    })
}
