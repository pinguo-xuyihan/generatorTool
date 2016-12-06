var fs = require("fs");

var arguments = process.argv.splice(2);
if (arguments.length === 0) {
	console.log('missing directory name param');
	process.exit();
}

var widget  = arguments[0];
var appName = '<%= appname %>';

var htmlTpl = [];
htmlTpl.push('<div class="styleguide '+ appName +'-widget-' + widget + '">');
htmlTpl.push('');
htmlTpl.push('</div>');
htmlTpl = htmlTpl.join('\n');

var styleTpl = [];
styleTpl.push( '.'+appName +'-widget-' + widget + ' {');
styleTpl.push('');
styleTpl.push('}');
styleTpl = styleTpl.join('\n');

var jsTpl = [];
var varTag = 'var';
<%if(supportECMA6){%>
	varTag = 'let'
<%}%>
var es5Var = 'var'
jsTpl.push(varTag + " style = __inline('./" + widget + ".inline.less');");
jsTpl.push(varTag + " tpl   = __inline('./" + widget + ".tmpl');");
jsTpl.push("");
jsTpl.push("require.loadCss({");
jsTpl.push("    name: '" + appName+"-widget-" + widget + "-style',");
jsTpl.push("    content: style");
jsTpl.push("});");
jsTpl.push("");

<%if(supportECMA6){%>
jsTpl.push("export default  class "+widget + "  {");
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

mkdirSync('app/widget/' + widget);

writeFile ('app/widget/'+ widget + '/' + widget + '.inline.less', styleTpl);
writeFile ('app/widget/'+ widget + '/' + widget + '.js', jsTpl);
writeFile ('app/widget/'+ widget + '/' + widget + '.tmpl', htmlTpl);

console.log('Create Widget Success!');
