var dispatcher = require('./../dispatcher.js');

module.exports = {
    add:function(feature){
        dispatcher.dispatch({
            payload:feature,
            type:"feature:add"
        });
    },
    remove:function(feature){
        dispatcher.dispatch({
            payload:feature,
            type:"feature:remove"
        });
    }
};
