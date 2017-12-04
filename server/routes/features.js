module.exports = function(app) {
    var Feature = require('./../models/Feature.js');
    
    app.route('/api/features')
    .get(function(req, res){
        Feature.find(function(error, doc){
            res.send(doc);
        });
    })
    .post(function(req, res){
        var feature = new Feature(req.body);
        feature.save(function(err, data){
            res.status(300).send();
        });
    })
    
    app.route('/api/addFeature')
        .post(function(req, res){
        Feature.findOne({branchName:req.body.branchName}, function(error, doc){
            if (doc) {
                for (var key in req.body){
                    doc[key] = req.body[key];
                }
                doc['timestamp'] = new Date().toLocaleString(); 
                doc.save();
            }
            res.status(200).send();
        });
    })
    
    app.route('/api/features/:id')
    .delete(function(req,res){
        Feature.find({_id:req.params.id}).remove(function(){
            res.status(202).send();
        });
    })
}
