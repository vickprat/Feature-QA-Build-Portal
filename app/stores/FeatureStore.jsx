var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function FeatureStore(){
    var listeners = [];
    var features = [];

    helper.get('/api/features')
        .then(function(data){
        features = data;
        triggerListeners();
    })
    
    function getFeatures(){
        return features;
    }
    
    function addFeature(feature){
        features.push(feature);
        triggerListeners();
        helper.post("/api/features", feature);
    }
    
    function removeFeature(feature){
        var index;
        features.filter(function(_feature, _index){
            if(_feature.featureName == feature.featureName){
                index = _index;
            }
        })
        features.splice(index, 1);
        triggerListeners();
        helper.del('/api/features'+feature._id);
    }
    
    function onChange(listener){
        listeners.push(listener);
    }
    
    function triggerListeners(){
        listeners.forEach(function(listener){
            listener(features);
        })
    }
    
    dispatcher.register(function(event){
        var split = event.type.split(':');
        if(split[0]==="feature"){
            switch(split[1]){
                case "add":
                    addFeature(event.payload);
                    break;
                case "remove":
                    removeFeature(event.payload);
                    break;
            }
        }
    })
    
    return {
        getFeatures:getFeatures,
        onChange:onChange
    }
}

module.exports = new FeatureStore();
