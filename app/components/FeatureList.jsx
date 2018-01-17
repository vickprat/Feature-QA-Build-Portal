var React = require('react');
var createReactClass = require('create-react-class');
var FeatureListAddFeature = require('./FeatureListAddFeature.jsx');
var DropDownMenu = require('material-ui/DropDownMenu').DropDownMenu;
var MenuItem = require('material-ui/MenuItem').default;
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var darkBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
var List = require('material-ui/List').default;
var ListItem = require('material-ui/List').default;
var Subheader = require('material-ui/Subheader').default;
var Divider = require('material-ui/Divider').default;
var AutoComplete = require('material-ui/AutoComplete').default;
var action = require('./../actions/FeatureActionCreator.jsx');
var RaisedButton = require('material-ui/RaisedButton').default;
var FlatButton = require('material-ui/FlatButton').default;
var Snackbar = require('material-ui/Snackbar').default;
var Dialog = require('material-ui/Dialog').default;

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

const platformArray = ['iOS', 'Android', 'Desktop'];

module.exports = createReactClass({
    getInitialState(){
        return {searchText:"", selectedIndex:-1, preProdBuildURL:"", prodBuildURL:"", timestamp:"", openDialog:false, buttonPressed:false, platformMenuItemValue:0};  
    },
    featureSelected(chosenRequest, index){
        this.setState({searchText:chosenRequest, selectedIndex:index, buttonPressed:false});
    },
    openDialog(e){
        e.preventDefault();
        this.setState({openDialog:true});
    },
    removeFeature(e){
        e.preventDefault();
        var features = this.props.features;
        const selectedPlatformFeatures = [];
        for (let i = 0; i < features.length; i++) {
            if (features[i].platform==platformArray[this.state.platformMenuItemValue]) {
                selectedPlatformFeatures.push(features[i]);
            }
        }
        action.remove(selectedPlatformFeatures[this.state.selectedIndex]);
        this.setState({searchText:"", preProdBuildURL:"", prodBuildURL:"", timestamp:"", selectedIndex:-1, openDialog:false, buttonPressed:true, message:"Feature removed successfully!!"});
    },
    handleDialogClose(){
        this.setState({openDialog:false});
    },
    getBuild(e){
        e.preventDefault();
        var features = this.props.features;
        const selectedPlatformFeatures = [];
        for (let i = 0; i < features.length; i++) {
            if (features[i].platform==platformArray[this.state.platformMenuItemValue]) {
                selectedPlatformFeatures.push(features[i]);
            }
        }
        var selectedFeature = selectedPlatformFeatures[this.state.selectedIndex];
        if (selectedFeature.preProdBuildURL || selectedFeature.prodBuildURL) {
            this.setState({preProdBuildURL:selectedFeature.preProdBuildURL, prodBuildURL:selectedFeature.prodBuildURL, timestamp:selectedFeature.timestamp, buttonPressed:true, message:"Build found!!"});
        } else {
            this.setState({searchText:"", preProdBuildURL:"", prodBuildURL:"", timestamp:"", selectedIndex:-1, buttonPressed:true, message:"Build not found!!"});
        }
    },
    updateInput(searchText, dataSource, params){
        this.setState({searchText:searchText, preProdBuildURL:"", prodBuildURL:"", timestamp:"", selectedIndex:-1, buttonPressed:false});
    },
    snackBarClosed(){
        this.setState({buttonPressed:false});
    },
    snackBarTouched(){
        this.setState({buttonPressed:false});  
    },
    platformMenuItemTapped(e, key, value){
        e.preventDefault();
        this.setState({searchText:"", preProdBuildURL:"", prodBuildURL:"", timestamp:"", buttonPressed:false, selectedIndex:-1, platformMenuItemValue:value});
    },
    render(){
        const actions = [<FlatButton label="YES" primary={true} onClick={this.removeFeature}/>,
                         <FlatButton label="NO" primary={true} onClick={this.handleDialogClose}/>];
        var features = this.props.features;
        const featureNames = [];
        for (let i = 0; i < features.length; i++) {
            if (features[i].platform==platformArray[this.state.platformMenuItemValue]) {
                featureNames.push(features[i].featureName);
            }
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Snackbar
                        open={this.state.buttonPressed}
                        message={this.state.message}
                        autoHideDuration={3000}
                        action="Close"
                        onActionTouchTap={this.snackBarTouched}
                        onRequestClose={this.snackBarClosed}
                    />
                    <Divider />
                    <List>
                        <Subheader style={{fontSize:'25px'}} inset={true}>Get build for a feature or remove a feature from the features list</Subheader> 
                        <ListItem>
                            <DropDownMenu value={this.state.platformMenuItemValue} onChange={this.platformMenuItemTapped}>
                                <MenuItem value={0} primaryText={platformArray[0]} />
                                <MenuItem value={1} primaryText={platformArray[1]} />
                                <MenuItem value={2} primaryText={platformArray[2]} />
                            </DropDownMenu>
                        </ListItem>
                        <ListItem>
                            <AutoComplete
                              floatingLabelText="Search feature name"
                              filter={AutoComplete.caseInsensitiveFilter}
                              dataSource={featureNames}
                              onNewRequest={this.featureSelected}
                              openOnFocus={true}
                              textFieldStyle={styles.customWidth}
                              onUpdateInput={this.updateInput}
                              searchText={this.state.searchText}
                              fullWidth={true}
                              listStyle={{maxHeight:500,overflow:'auto'}}
                            />
                        </ListItem>
                        <ListItem>
                            <RaisedButton label="Get build" style={buttonStyles.customWidth} primary={true} onClick={this.getBuild} disabled={this.state.selectedIndex==-1}/>      
                            <FlatButton href={this.state.preProdBuildURL} target="_blank" hoverColor="#ffffff" label={this.state.preProdBuildURL ? "Pre-prod Build URL" : ""} primary={true}/>
                            <FlatButton href={this.state.prodBuildURL} target="_blank" hoverColor="#ffffff" label={this.state.prodBuildURL ? "Prod Build URL" : ""} primary={true}/>
                            <FlatButton label={this.state.timestamp} disabled={true}/>
                        </ListItem>
                        <ListItem>
                            <RaisedButton label="Remove" style={buttonStyles.customWidth} secondary={true} onClick={this.openDialog} disabled={this.state.selectedIndex==-1}/>
                            <Dialog actions={actions} modal={false} open={this.state.openDialog} onRequestClose={this.handleDialogClose}>
                                Are you sure you want to remove the feature ?
                            </Dialog>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <Subheader inset={true} style={{fontSize:'25px'}}>Add new feature to the features list</Subheader>
                        <FeatureListAddFeature features={this.props.features}/>
                    </List>
                    <Divider />
                    <List>
                        <Subheader style={{fontSize:'15px'}}>Made with 💗 by फ्लॉक iOS टीम</Subheader>
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
});
