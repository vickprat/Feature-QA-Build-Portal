var React = require('react');
var createReactClass = require('create-react-class');
var action = require('./../actions/FeatureActionCreator.jsx');
var RaisedButton = require('material-ui/RaisedButton').default;
var TextField = require('material-ui/TextField').default;
var List = require('material-ui/List').default;
var ListItem = require('material-ui/List').default;

const styles = {
  customWidth: {
    width: 500,
  },
};

const buttonStyles = {
    customWidth: {
        width: 250,
    },
};

module.exports = createReactClass({
    getInitialState:function(){
        return {featureName:"", branchName:""};
    },
    handleFeatureNameChange:function(e){
        this.setState({featureName:e.target.value});
    },
    handleBranchNameChange:function(e){
        this.setState({branchName:e.target.value});
    },
    addItem:function(e){
        e.preventDefault();
        action.add({
            featureName:this.state.featureName,
            branchName:this.state.branchName
        });
        this.setState({featureName:"", branchName:""});
    },
    render:function(){
        return (
            <div>
                <ListItem>
                    <TextField value={this.state.featureName} floatingLabelText="Enter feature name" style={styles.customWidth} required onChange={this.handleFeatureNameChange}/>
                </ListItem>
                <ListItem>
                    <TextField value={this.state.branchName} floatingLabelText="Enter git branch name" style={styles.customWidth} required onChange={this.handleBranchNameChange}/>
                </ListItem>
                <ListItem>
                    <RaisedButton label="Add feature" style={buttonStyles.customWidth} primary={true} onClick={this.addItem} disabled={this.state.featureName==''|| this.state.branchName==''}/>
                </ListItem>
            </div>
        )
    }
});
