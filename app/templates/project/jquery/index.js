/* jshint devel:true */
<%if(supportECMA6){%>
let template = require('html-loader!./index.html');
<%}else if(includeHandlebars){%>
var template = require('./index.handlebars');
<%}else{%>
var template = require('html-loader!./index.html');
<%}%>
require('./index.less');

<%if(supportECMA6){%>
export default  class index {
<%}else{%>
module.exports = {
<%}%>
<%if(supportECMA6){%>
    render() {
    <%}else{%>
    render: function () {
    <%}%>
    	<%if(includeHandlebars){%>
    	var context = {
    		solution: " jquery + webpack + handlebars", 
    	};
    	var html    = template(context);
        $('.root').html(html);
    	<%}else{%>
    	    $('.root').html(template);
    	<%}%>


    } 
}
