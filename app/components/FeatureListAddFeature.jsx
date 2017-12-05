var React = require('react');
var createReactClass = require('create-react-class');
var action = require('./../actions/FeatureActionCreator.jsx');
var RaisedButton = require('material-ui/RaisedButton').default;
var TextField = require('material-ui/TextField').default;
var List = require('material-ui/List').default;
var ListItem = require('material-ui/List').default;
var Snackbar = require('material-ui/Snackbar').default;
var DropDownMenu = require('material-ui/DropDownMenu').DropDownMenu;
var MenuItem = require('material-ui/MenuItem').default;

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

const platformArray = ["iOS", "Android", "Desktop"];

module.exports = createReactClass({
    getInitialState(){
        return {featureName:"", branchName:"", buttonPressed:false, platformMenuItemValue:0};
    },
    handleFeatureNameChange(e){
        this.setState({featureName:e.target.value, buttonPressed:false});
    },
    handleBranchNameChange(e){
        this.setState({branchName:e.target.value, buttonPressed:false});
    },
    snackBarClosed(){
        this.setState({featureName:"", branchName:"", buttonPressed:false});
        window.location.reload();
    },
    snackBarTouched(){
        this.setState({featureName:"", branchName:"", buttonPressed:false});  
        window.location.reload();
    },
    addItem(e){
        e.preventDefault();
        var index = -1;
        var features = this.props.features;
        var featureName = this.state.featureName;
        var platformMenuItemValue = this.state.platformMenuItemValue;
        features.filter(function(_feature, _index){
            if(_feature.featureName == featureName && _feature.platform == platformArray[platformMenuItemValue]){
                index = _index;
            }
        })
        if(index==-1){
            action.add({
                featureName:this.state.featureName,
                branchName:this.state.branchName,
                platform:platformArray[this.state.platformMenuItemValue]
            });
            this.setState({featureName:"", branchName:"", buttonPressed:true, message:"Feature added successfully"});
        } else {
            this.setState({buttonPressed:true, message:"Duplicate feature name"});
        }
    },
    platformMenuItemTapped(e, key, value){
        e.preventDefault();
        this.setState({platformMenuItemValue:value});
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
                    <DropDownMenu value={this.state.platformMenuItemValue} onChange={this.platformMenuItemTapped}>
                        <MenuItem value={0} primaryText={platformArray[0]} />
                        <MenuItem value={1} primaryText={platformArray[1]} />
                        <MenuItem value={2} primaryText={platformArray[2]} />
                    </DropDownMenu>
                </ListItem>
                <ListItem>
                    <RaisedButton label="Add feature" style={buttonStyles.customWidth} primary={true} onClick={this.addItem} disabled={this.state.featureName==''|| this.state.branchName==''}/>
                </ListItem>
            </div>
        )
    }
});
