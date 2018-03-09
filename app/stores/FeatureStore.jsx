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
        helper.post('/api/registerFeature', feature);
    }
    
    function removeFeature(feature){
        var index = -1;
        features.filter(function(_feature, _index){
            if(_feature.featureName == feature.featureName && _feature.platform == feature.platform){
                index = _index;
            }
        })
        if(index!=-1){
            features.splice(index, 1);
            triggerListeners();
            helper.del('/api/removeFeature/' + feature.platform + '/' + feature.branchName);
        }
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
