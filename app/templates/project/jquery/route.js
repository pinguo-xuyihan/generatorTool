/**
 * @author xuyihan@camera360.com
 * @date 2016.11.25
 *
 * regist async module for loaded  when system is running
 * @require.async <%= appname %>:app/page/index/index.js
**/
var $ = require('jquery');

(function(){

    var navigation = function() {

        $('body').empty(); 
         
        var hash = location.hash.split("#")[1];
        var path = '<%= appname %>:app/page/'+ hash +'/' + hash;
        
        require.async(path, function (page) {
            page.render();
        });
    }

    navigation();

    window.addEventListener('hashchange', function () {
        navigation();
    }, false);

})();
