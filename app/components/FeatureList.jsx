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
      return {value:-1, buildURL:"", timestamp:""};  
    },
    featureSelected:function(event, index){
        this.setState({value:index});
    },
    remove(e){
        e.preventDefault();
        action.remove(this.props.features[this.state.value]);
        this.setState({value:-1, buildURL:"", timestamp:""});
    },
    getBuild(e){
        e.preventDefault();
        if (this.props.features[this.state.value].buildURL) {
            this.setState({value:-1, buildURL:this.props.features[this.state.value].buildURL, timestamp:this.props.features[this.state.value].timestamp});
        } else {
            this.setState({value:-1, buildURL:"", timestamp:""});
        }
    },
    updateInput(searchText, dataSource, params){
        this.setState({value:-1, buildURL:"", timestamp:""});
    },
    render:function(){
        var features = this.props.features;
        const featureNames = [];
        for (let i = 0; i < features.length; i++) {
            featureNames.push(features[i].featureName);
        }
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>  
                    <List>
                        <ListItem>
                            <Subheader inset={true}>Get build for a feature or remove a feature from the features list</Subheader>
                            <AutoComplete
                              floatingLabelText="Search feature name"
                              filter={AutoComplete.caseInsensitiveFilter}
                              dataSource={featureNames}
                              onNewRequest={this.featureSelected}
                              openOnFocus={true}
                              textFieldStyle={styles.customWidth}
                              onUpdateInput={this.updateInput}    
                            />
                        </ListItem>
                        <ListItem>
                            <RaisedButton label="Get build" style={buttonStyles.customWidth} primary={true} onClick={this.getBuild} disabled={this.state.value==-1}/>
                            <FlatButton href={this.state.buildURL} target="_blank" label={this.state.buildURL ? "Feature Build URL" : ""} primary={true}/>
                            <FlatButton label={this.state.timestamp} disabled={true}/>
                        </ListItem>
                        <ListItem>
                            <RaisedButton label="Remove" style={buttonStyles.customWidth} secondary={true} onClick={this.remove} disabled={this.state.value==-1}/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <Subheader inset={true}>Add new feature to the features list</Subheader>
                        <FeatureListAddFeature/>
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
});
