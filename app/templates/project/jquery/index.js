/* jshint devel:true */
<%if(supportECMA6){%>
let style = __inline('./index.inline.less');
let tpl   = __inline('./index.tmpl');
let $ = require('jquery');
<%}else{%>
var style = __inline('./index.inline.less');
var tpl   = __inline('./index.tmpl');
var $ = require('jquery');
<%}%>

require.loadCss({
    name: 'index-page-style',
    content: style
});

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
        var data = {};
    <%}%>
    	data ={

    		title : "Welcome to the new Fontend Build Tools",
    		list  : [
    			'性能优化、',
    			'资源加载（异步、同步、按需、预加载、依赖管理、合并、内嵌）',
    			'模块化开发',	
    			'自动化工具',	
    			'开发规范',	
    			'代码部署',	
    		]
    	}

        $('body').append(tpl({data: data}));
    } 
}
