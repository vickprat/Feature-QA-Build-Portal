var $ = require('jquery');

module.exports = {
    get(url){
        return new Promise(function(success, error){
            $.ajax({
                url:url,
                dataType:"json",
                success:success,
                error:error
            });
        });
    },
    post(url, data){
        return new Promise(function(success, error){
            $.ajax({
                url:url,
                type:"POST",
                data:data,
                success:success,
                error:error
            });
        });
    },
    patch(url, data){
        return new Promise(function(success, error){
            $.ajax({
                url:url,
                type:"PATCH",
                data:data,
                success:success,
                error:error
            });
        });
    },
    del(url){
        return new Promise(function(success, error){
            $.ajax({
                url:url,
                type:"DELETE",
                success:success,
                error:error
            });
        });
    }
}