var React = require('react');
var ReactDOM = require('react-dom');
var FeatureList = require('./components/FeatureList.jsx');
var featureStore = require('./stores/FeatureStore.jsx');

var initial = featureStore.getFeatures();

function render(){
    ReactDOM.render(<FeatureList features={initial}/>, app);
}

featureStore.onChange(function(features){
    initial = features;
    render();
})

render();
