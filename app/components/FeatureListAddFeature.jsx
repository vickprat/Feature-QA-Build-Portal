var React = require('react');
var createReactClass = require('create-react-class');
var action = require('./../actions/FeatureActionCreator.jsx');
var RaisedButton = require('material-ui/RaisedButton').default;
var TextField = require('material-ui/TextField').default;
var List = require('material-ui/List').default;
var ListItem = require('material-ui/List').default;
var Snackbar = require('material-ui/Snackbar').default;

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
    getInitialState(){
        return {featureName:"", branchName:"", buttonPressed:false};
    },
    handleFeatureNameChange(e){
        this.setState({featureName:e.target.value, buttonPressed:false});
    },
    handleBranchNameChange(e){
        this.setState({branchName:e.target.value, buttonPressed:false});
    },
    snackBarClosed(){
        this.setState({featureName:"", branchName:"", buttonPressed:false});
    },
    snackBarTouched(){
        this.setState({featureName:"", branchName:"", buttonPressed:false});  
    },
    addItem(e){
        e.preventDefault();
        action.add({
            featureName:this.state.featureName,
            branchName:this.state.branchName
        });
        this.setState({featureName:"", branchName:"", buttonPressed:true, message:"Feature added successfully"});
    },
    render(){
        return (
            <div>
                <Snackbar
                    open={this.state.buttonPressed}
                    message={this.state.message}
                    action="Close"
                    autoHideDuration={3000}
                    onRequestClose={this.snackBarClosed}
                    onActionTouchTap={this.snackBarTouched}
                />
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
