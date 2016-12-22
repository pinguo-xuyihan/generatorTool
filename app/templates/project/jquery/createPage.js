var fs = require("fs");

var arguments = process.argv.splice(2);
if (arguments.length === 0) {
	console.log('missing directory name param');
	process.exit();
}

var page  = arguments[0];
var subDir   = arguments[1] || '' ; 
var appName = '<%= appname %>'.toLocaleLowerCase();

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

<%if(supportECMA6){%>
	es6Var = 'let'
<%}%>
var es5Var = 'var'

<%if(supportECMA6){%>

jsTpl.push(es6Var + " template = require('html!./"+ page +".html');");
jsTpl.push(" require('./"+ page +".less');");
jsTpl.push("");

jsTpl.push("export default  class index ");
jsTpl.push(" 	render()  {");
jsTpl.push(" 		$('.root').html(template);");
jsTpl.push(" 		this.bind();");
jsTpl.push(" 	},");
jsTpl.push(" 	bind () {");
jsTpl.push(" 		//bind Dom Event");
jsTpl.push(" 	},");
jsTpl.push("};");
<%}else{%>
jsTpl.push(es5Var + " template = require('html!./"+ page +".html');");
jsTpl.push(" require('./"+ page +".less');");
jsTpl.push("");

jsTpl.push("module.exports = {");
jsTpl.push(" 	render: function () {");
jsTpl.push(" 		$('.root').html(template);");
jsTpl.push(" 		this.bind();");
jsTpl.push(" 	},");
jsTpl.push(" 	bind: function () {");
jsTpl.push(" 		//bind Dom Event");
jsTpl.push(" 	},");
jsTpl.push("};");
<%}%>

jsTpl = jsTpl.join('\n');


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

if(subDir){
	
	mkdirSync('app/page/' + subDir + '/'+ page);
	writeFile ('app/page/' + subDir + '/'+ page + '/' + page + '.less', styleTpl);
	writeFile ('app/page/' + subDir + '/'+ page + '/' + page + '.js', jsTpl);
	writeFile ('app/page/' + subDir + '/'+ page + '/' + page + '.html', htmlTpl);

}else{
	mkdirSync('app/page/' + page);
	writeFile ('app/page/'+ page + '/' + page + '.less', styleTpl);
	writeFile ('app/page/'+ page + '/' + page + '.js', jsTpl);
	writeFile ('app/page/'+ page + '/' + page + '.html', htmlTpl);
}


console.log('Create page Success!');
