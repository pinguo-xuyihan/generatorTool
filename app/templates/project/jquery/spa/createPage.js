var fs = require("fs");

var arguments = process.argv.splice(2);
if (arguments.length === 0) {
	console.log('missing directory name param');
	process.exit();
}

var page  = arguments[0];
var appName = '<%= appname %>';

var htmlTpl = [];
htmlTpl.push('<div class="styleguide '+ appName +'-page-' + page + '">');
htmlTpl.push('');
htmlTpl.push('</div>');
htmlTpl = htmlTpl.join('\n');

var styleTpl = [];
styleTpl.push( '.'+appName +'-page-' + page + ' {');
styleTpl.push('');
styleTpl.push('}');
styleTpl = styleTpl.join('\n');

var jsTpl = [];
var varTag = 'var';
<%if(supportECMA6){%>
	varTag = 'let'
<%}%>
var es5Var = 'var'
jsTpl.push(varTag + " style = __inline('./" + page + ".inline.less');");
jsTpl.push(varTag + " tpl   = __inline('./" + page + ".tmpl');");
jsTpl.push("");
jsTpl.push("require.loadCss({");
jsTpl.push("    name: '" + appName+"-page-" + page + "-style',");
jsTpl.push("    content: style");
jsTpl.push("});");
jsTpl.push("");

<%if(supportECMA6){%>
jsTpl.push("export default  class "+page + "  {");
jsTpl.push(" 	render () {");
jsTpl.push(" 		"+ varTag+ " data ={};");
jsTpl.push(" 		//TODO");
jsTpl.push(" 	},");
jsTpl.push("};");
jsTpl = jsTpl.join('\n');
<%}else{%>
jsTpl.push("module.exports = {");
jsTpl.push(" 	render: function () {");
jsTpl.push(" 		"+ varTag+ " data ={};");
jsTpl.push(" 		//TODO");
jsTpl.push(" 	},");
jsTpl.push("};");
jsTpl = jsTpl.join('\n');
<%}%>


function writezRouteFile (filename , content){

	fs.open	(filename, 'r+', '0644', function (e, fd) {
	    
	    if(e) throw e;
	    var buffer = new Buffer(content);

		fs.write(fd, buffer,0,buffer.length,168, function (err, written, buffer) {
			console.log('write-buffer:' + buffer);
		 });
	});
}

function mkdirSync (dir, mode) {
	mode = mode || 0755;

	if(!fs.existsSync(dir)) {
		fs.mkdirSync(dir, mode)
	} else {
		console.log('Directory [' + dir + '] has existed');
		process.exit();
	}
}

function writeFile (filename, content) {
	fs.open(filename, 'w', '0644', function (e, fd) {
	    
	    if(e) throw e;
	    
	    fs.write(fd, content, function(e){
	        if(e) throw e;
	        fs.closeSync(fd);
	    });
	});
}

mkdirSync('app/page/' + page);

writeFile ('app/page/'+ page + '/' + page + '.inline.less', styleTpl);
writeFile ('app/page/'+ page + '/' + page + '.js', jsTpl);
writeFile ('app/page/'+ page + '/' + page + '.tmpl', htmlTpl);

var routeInfo =  '* @require.async <%= appname %>:app/page/'+ page + '/'+page+'.js ';
writezRouteFile ('app/common/js/route.js' ,routeInfo);

console.log('Create page Success!');
