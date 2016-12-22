/* jshint devel:true */
<%if(supportECMA6){%>
let template = require('html-loader!./index.html');
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
        let data = {};
    <%}else{%>
    render: function () {
    <%}%>
        $('.root').html(template);
    } 
}
