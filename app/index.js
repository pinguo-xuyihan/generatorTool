'use strict';
var fs       = require('fs');
var path     = require('path');
var yeoman   = require('yeoman-generator');
var wiredep  = require('wiredep');
var inquirer = require('inquirer');

var deleteFolderRecursive = function(path) {

    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }

};

var appPath = process.cwd(); 
var appExist = fs.existsSync(appPath+"/app");

if (appExist) {

  module.exports = yeoman.generators.Base.extend({

    /**
    *   Some generator methods can only be called inside 
    *   the constructor function
    **/
    constructor: function () {
      yeoman.generators.Base.apply(this, arguments);

      // This method adds support for a `--test-framework` flag
      this.option('test-framework', {
        desc: 'Test framework to be invoked',
        type: String,
        defaults: 'mocha'
      });

      this.option('skip-welcome-message', {
        desc: 'Skips the welcome message',
        type: Boolean
      });

      this.option('skip-install', {
        desc: 'Skips the installation of dependencies',
        type: Boolean
      });

      this.option('skip-install-message', {
        desc: 'Skips the message after the installation of dependencies',
        type: Boolean
      });
    },

    initializing: function () {
      this.pkg = require('../package.json');
      this.allowUpdate = false;
      this.includeReactAndReflux = false;
      this.supportECMA6 = false;
      //this.supportKits = false;
      if(fs.existsSync(process.env.PWD+"/node_modules/react")) this.includeReact = true;
      if(fs.existsSync(process.env.PWD+"/node_modules/jquery")) this.includeJquery = true;
      if(fs.existsSync(process.env.PWD+"/node_modules/vue")) this.includeVue = true;

      if(this.includeJquery || this.includeVue){
          this.supportECMA6 = true;
      }
    },


        prompting: function () {

      var done = this.async();
      var me = this;
      if (!this.options['skip-welcome-message']) {
        this.log('==========\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.==========');
      }

    var prompts = {
        type: 'checkbox',
        name: 'features',
        message: '?',
        choices: [{
          name:'是否进行环境升级？',
          value:'allowUpdate',
          checked:false
        },{
          name:'jQuery',
          value:'includeJquery',
          checked:false,
        },{
          name:'React',
          value:'includeReact',
          checked:false
        },{
          name:'Vue',
          value:'includeVue',
          checked:false
        },{
          name:'常规套件(PGBridge, PGClip, PGServer)',
          value:'supportKits',
          checked:false
        },{
            name:'exit',
            value:'exitProcess',
            checked:false
        }]
      };

      inquirer.prompt([ prompts, {
          when: function (answers) {
            var features = answers.features;
            var hasFeature = function (feat) {
              return features.indexOf(feat) !== -1;
            };
            this.includeJquery       = hasFeature('includeJquery');

            return this.includeJquery;
          },
          name: 'fontTemplate',
          message: '选择所需要的前端模板',
          type: 'checkbox',
          choices: [
            {
                name:'不包含模板',
                value:'noTemplate',
                checked:false
            },
            {
                name:'handlebars',
                value:'includeHandlebars',
                checked:false
            }
          ],
        },
        {
          when: function (answers) {
            var features = answers.features;
            var hasFeature = function (feat) {
              return features.indexOf(feat) !== -1;
            };
            this.includeReact  = hasFeature('includeReact');

            return this.includeReact;
          },
          name: 'reactDataFlow',
          message: 'chooise a dataflow architecture of react',
          type: 'checkbox',
          choices: [
            {
                name:'no need',
                value:'noDataFlow',
                checked:false
            },
            {
                name:'reflux',
                value:'includeReflux',
                checked:false
            },
            { 
                name:'redux',
                value:'includeRedux',
                checked:false
            }
          ],
        },{
        when: function (answers) {
            var features = answers.features;
            var hasFeature = function (feat) {
              return features.indexOf(feat) !== -1;
            };
            this.supportKits  = hasFeature('supportKits');

            return this.supportKits;
          },
          name: 'commonKits',
          message: '选择你所需要的通用套件',
          type: 'checkbox',
          choices: [
            {
                name:'Native通信(PGBridge,PGtool)',
                value:'includePgBridge',
                checked:false
            },
            {
                name:'通用方法(PGCommon)',
                value:'includeCommonTool',
                checked:false
            },
            {
                name:'图像处理(PGClip , fileReader)',
                value:'includeImageHandles',
                checked:false
            }
          ],
        }], function (answers) {
        }).then(function(answers){
            var features = answers.features;

            var hasFeature = function (arr,feat) {

              return arr.indexOf(feat) !== -1;
            };
            me.allowUpdate     = hasFeature(features, 'allowUpdate');
            me.includeVue      = hasFeature(features, 'includeVue');
            me.includeReact    = hasFeature(features, 'includeReact');
            me.includeVue      = hasFeature(features, 'includeVue');
            me.includeJquery   = hasFeature(features, 'includeJquery');
            me.supportKits     = hasFeature(features, 'supportKits');
            me.exitProcess     = hasFeature(features, 'exitProcess');

            me.includeReflux  = '';
            me.includeRedux   = '';
            me.includeHandlebars = '';
            me.supportECMA6   = '';
            me.includePgBridge = '';
            me.includeCommonTool = '';
            me.includeImageHandles = '';

            if(me.exitProcess){
                process.exit();
            }

            if(me.includeReact){
                
                var reactDataFlow   = answers.reactDataFlow;

                me.noDataFlow     = hasFeature(reactDataFlow, 'noDataFlow');
                me.includeReflux  = hasFeature(reactDataFlow, 'includeReflux');
                me.includeRedux   = hasFeature(reactDataFlow, 'includeRedux');

            } 

            if(me.includeJquery){
                
                var fontTemplate  = answers.fontTemplate;

                me.noTemplate     = hasFeature(fontTemplate, 'noTemplate');
                me.includeHandlebars  = hasFeature(fontTemplate, 'includeHandlebars');

            }

            if(me.supportKits){
                var commonKits  = answers.commonKits;
                me.includePgBridge = hasFeature(commonKits, 'includePgBridge');
                me.includeCommonTool = hasFeature(commonKits, 'includeCommonTool');
                me.includeImageHandles = hasFeature(commonKits, 'includeImageHandles');
            }



        if (!me.allowUpdate){

          this.log('========== update done ==========');
          process.exit();

        }else{

          deleteFolderRecursive(process.env.PWD+'/node_modules');
          if(fs.existsSync(process.env.PWD+"/package.json")) fs.unlinkSync(process.env.PWD+'/package.json');
          if(fs.existsSync(process.env.PWD+"/.gitignore")) fs.unlinkSync(process.env.PWD+'/.gitignore');
          if(fs.existsSync(process.env.PWD+"/.gitattributes")) fs.unlinkSync(process.env.PWD+'/.gitattributes');
          if(fs.existsSync(process.env.PWD+"/.jshintrc")) fs.unlinkSync(process.env.PWD+'/.jshintrc');
          if(fs.existsSync(process.env.PWD+"/.editorconfig")) fs.unlinkSync(process.env.PWD+'/.editorconfig');
        }

            done();

        });
    },

    prompting: function () {

      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name:'是否进行环境升级？',
          value:'allowUpdate',
          checked:false
        },{
          name:'jQuery',
          value:'includeJquery',
          checked:this.includeJquery
        },{
          name:'React',
          value:'includeReact',
          checked:this.includeReact
        },{
          name:'Vue',
          value:'includeVue',
          checked:this.includeVue
        },{
          name:'常规套件(PGBridge, PGClip, PGServer)',
          value:'supportKits',
          checked:false
        },{
          name:'exit',
          value:'exitProcess',
          checked:false
        }]
      }];

      this.prompt(prompts, function (answers) {

        var features = answers.features;

        var hasFeature = function (feat) {
          return features.indexOf(feat) !== -1;
        };

        this.allowUpdate       = hasFeature('allowUpdate');
        this.includeJquery     = hasFeature('includeJquery');
        this.includeReact      = hasFeature('includeReact');
        this.includeVue        = hasFeature('includeVue');
        this.exitProcess       = hasFeature('exitProcess');

        if(this.exitProcess){
            process.exit();
        }
        //this.supportKits = hasFeature('supportKits');
        if (this.includeReactAndReflux || this.supportECMA6) {
            this.includeBrowserify = true;
        };

        if (!this.allowUpdate){

          this.log('========== update done ==========');
          process.exit();

        }else{

          deleteFolderRecursive(process.env.PWD+'/node_modules');
          if(fs.existsSync(process.env.PWD+"/package.json")) fs.unlinkSync(process.env.PWD+'/package.json');
          if(fs.existsSync(process.env.PWD+"/.gitignore")) fs.unlinkSync(process.env.PWD+'/.gitignore');
          if(fs.existsSync(process.env.PWD+"/.gitattributes")) fs.unlinkSync(process.env.PWD+'/.gitattributes');
          if(fs.existsSync(process.env.PWD+"/.jshintrc")) fs.unlinkSync(process.env.PWD+'/.jshintrc');
          if(fs.existsSync(process.env.PWD+"/.editorconfig")) fs.unlinkSync(process.env.PWD+'/.editorconfig');
        }
        done();
      }.bind(this));
    },

    writing: {

      webpackConfig :function(){
          this.template('webpack.config.js');
      },

      packageJSON: function() {
          this.template('_package.json', 'package.json');
      },

      jshint: function () {
        this.copy('jshintrc', '.jshintrc');
      },

      editorConfig: function () {
        this.copy('editorconfig', '.editorconfig');
      }
    },

    install: function () {
    
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install']
      });

      this.on('end', function () {
        this.log('==========构建环境升级成功==========');
      }.bind(this));
    }

  });

}else{

  module.exports = yeoman.generators.Base.extend({
    constructor: function () {
      yeoman.generators.Base.apply(this, arguments);

      this.option('test-framework', {
        desc: 'Test framework to be invoked',
        type: String,
        defaults: 'mocha'
      });

      this.option('skip-welcome-message', {
        desc: 'Skips the welcome message',
        type: Boolean
      });

      this.option('skip-install', {
        desc: 'Skips the installation of dependencies',
        type: Boolean
      });

      this.option('skip-install-message', {
        desc: 'Skips the message after the installation of dependencies',
        type: Boolean
      });
    },
    initializing: function () {
      this.pkg = require('../package.json');
      this.includeBootstrap = null;
      this.includeModernizr = null;
    },

    prompting: function () {

      var done = this.async();
      var me = this;
      if (!this.options['skip-welcome-message']) {
        this.log('==========\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.==========');
      }

    var prompts = {
        type: 'checkbox',
        name: 'features',
        message: '?',
        choices: [{
          name:'jQuery as API',
          value:'includeJqueryAPI',
          checked:false,
        },{
          name:'jQuery',
          value:'includeJquery',
          checked:false,
        },{
          name:'React',
          value:'includeReact',
          checked:false
        },{
          name:'Vue',
          value:'includeVue',
          checked:false
        },{
          name:'常规套件(PGBridge, PGClip, PGServer)',
          value:'supportKits',
          checked:false
        },{
            name:'exit',
            value:'exitProcess',
            checked:false
        }]
      };

      inquirer.prompt([ prompts, {
          when: function (answers) {
            var features = answers.features;
            var hasFeature = function (feat) {
              return features.indexOf(feat) !== -1;
            };
            this.includeJquery   = hasFeature('includeJquery');

            return this.includeJquery;
          },
          name: 'fontTemplate',
          message: '选择所需要的前端模板',
          type: 'checkbox',
          choices: [
            {
                name:'不包含模板',
                value:'noTemplate',
                checked:false
            },
            {
                name:'handlebars',
                value:'includeHandlebars',
                checked:false
            }
          ],
        },
        {
          when: function (answers) {
            var features = answers.features;
            var hasFeature = function (feat) {
              return features.indexOf(feat) !== -1;
            };
            this.includeReact  = hasFeature('includeReact');

            return this.includeReact;
          },
          name: 'reactDataFlow',
          message: 'chooise a dataflow architecture of react',
          type: 'checkbox',
          choices: [
            {
                name:'no need',
                value:'noDataFlow',
                checked:false
            },
            {
                name:'reflux',
                value:'includeReflux',
                checked:false
            },
            { 
                name:'redux',
                value:'includeRedux',
                checked:false
            }
          ],
        },{
        when: function (answers) {
            var features = answers.features;
            var hasFeature = function (feat) {
              return features.indexOf(feat) !== -1;
            };
            this.supportKits  = hasFeature('supportKits');

            return this.supportKits;
          },
          name: 'commonKits',
          message: '选择你所需要的通用套件',
          type: 'checkbox',
          choices: [
            {
                name:'Native通信(PGBridge,PGtool)',
                value:'includePgBridge',
                checked:false
            },
            {
                name:'通用方法(PGCommon)',
                value:'includeCommonTool',
                checked:false
            },
            {
                name:'图像处理(PGClip , fileReader)',
                value:'includeImageHandles',
                checked:false
            }
          ],
        }], function (answers) {
        }).then(function(answers){
            var features = answers.features;

            var hasFeature = function (arr,feat) {

              return arr.indexOf(feat) !== -1;
            };
            me.includeReact    = hasFeature(features, 'includeReact');
            me.includeVue      = hasFeature(features, 'includeVue');
            me.includeJquery   = hasFeature(features, 'includeJquery');
            me.supportKits     = hasFeature(features, 'supportKits');
            me.exitProcess     = hasFeature(features, 'exitProcess');

            me.includeReflux  = '';
            me.includeRedux  = '';
            me.includeHandlebars = '';
            me.supportECMA6 = '';

            me.includePgBridge = '';
            me.includeCommonTool = '';
            me.includeImageHandles = '';

            if(me.exitProcess){
                process.exit();
            }

            if(me.includeReact){
                
                var reactDataFlow   = answers.reactDataFlow;

                me.noDataFlow     = hasFeature(reactDataFlow, 'noDataFlow');
                me.includeReflux  = hasFeature(reactDataFlow, 'includeReflux');
                me.includeRedux   = hasFeature(reactDataFlow, 'includeRedux');

            } 

            if(me.includeJquery){
                
                var fontTemplate  = answers.fontTemplate;

                me.noTemplate     = hasFeature(fontTemplate, 'noTemplate');
                me.includeHandlebars  = hasFeature(fontTemplate, 'includeHandlebars');

            }

            if(me.supportKits){
                var commonKits  = answers.commonKits;
                me.includePgBridge = hasFeature(commonKits, 'includePgBridge');
                me.includeCommonTool = hasFeature(commonKits, 'includeCommonTool');
                me.includeImageHandles = hasFeature(commonKits, 'includeImageHandles');
            }

            done();

        });
    },

    writing: {

      webpackConfig :function(){
          this.template('webpack.config.js');
      },

      packageJSON: function() {
          this.template('_package.json', 'package.json');
      },

      writeJquery:function(){
        console.log('writeJquery');
          if(this.includeJquery){

              var rootPath = 'project/jquery/';

              this.template( rootPath + 'createPage.js', 'createPage.js')
              this.template( rootPath + 'createWidget.js', 'createWidget.js');

              if(this.includeHandlebars){
                  this.copy( rootPath + 'index.handlebars'  , 'app/page/index/index.handlebars' );
              }else{
                  this.template( rootPath + 'index.html'  , 'app/page/index/index.html' );
              }

              this.copy( rootPath + 'index.less'  , 'app/page/index/index.less');
              this.template( rootPath + 'index.js'    , 'app/page/index/index.js');
              this.copy( rootPath + 'route.js'    , 'app/common/js/route.js');

              this.template( 'project/index.html', 'index.html');
              this.copy(rootPath + 'app.js', 'app.js');
          }


      },

      writeReact:function(){

          if(this.includeReact){

              var rootPath = 'project/react/';
              this.template( rootPath + 'createComponent.js', 'createComponent.js');
              this.template( 'project/index.html', 'index.html');
              this.template( rootPath + 'app.js', 'app.js');
              this.copy( rootPath + 'root.js', 'app/root.js');
              this.copy(rootPath + 'dll.config.js','dll.config.js');
              this.copy(rootPath + 'server.js','server.js');
              this.copy( rootPath +'index.js' , 'app/page/index/index.js');
              this.copy( rootPath +'index.less' , 'app/page/index/index.less');
          }
      },

      writeVue:function(){

          if(this.includeVue){

              var rootPath = 'project/vue/';
              this.template( 'project/index.html', 'index.html');
              this.template( rootPath + 'app.js', 'app.js');
              this.copy( rootPath +'index.vue' , 'app/page/index.vue');
              this.copy( rootPath +'main.vue' , 'app/page/main.vue');

          }
      
      },
      // writeKits:function(){
      //   console.log('writeKits');
      //     if(this.supportKits){
      //         var rootPath = 'project/kits/';
      //         if(this.includePgBridge){
      //             this.copy( rootPath +'PGBridge.js' , 'app/common/js/PGBridge.js');
      //             this.copy( rootPath +'PGTool.js' , 'app/common/js/PGTool.js');
      //         }

      //     }
      // },

      git: function() {
          this.copy('gitignore', '.gitignore');
          //this.copy('gitattributes', '.gitattributes');
      },

      app: function () {

        if( this.includeJquery ){

            this.mkdir('app');
            this.mkdir('app/page');
            this.mkdir('app/page/index');
            this.mkdir('app/widget');
            this.mkdir('app/resource');
            this.mkdir('app/resource/css');
            this.mkdir('app/resource/font');
            this.mkdir('app/resource/images');
            this.mkdir('app/common');
            this.mkdir('app/common/js');
            this.mkdir('app/common/lib');
            this.copy('project/debug.html', 'app/debug.html');

        }else{

            this.mkdir('app');
            this.mkdir('app/components');
            this.mkdir('app/common');
            this.mkdir('app/common/js');
            this.mkdir('app/common/lib');
            this.mkdir('app/page');
            this.mkdir('app/resource');
            this.mkdir('app/resource/images');
            this.mkdir('app/resource/css');
            this.mkdir('app/resource/font');

            if(this.includeReflux || this.includeRedux){
                this.mkdir('app/actions');
                this.mkdir('app/stores');
            }

        }

      }
    },

    install: function () {
      
      var howToInstall =
        '\nAfter running ' +
        'npm install & bower install' +
        ', inject your' +
        '\nfront end dependencies by running ' +
        'gulp wiredep.';

      if (this.options['skip-install']) {
        this.log(howToInstall);
        return;
      }

      this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
      });

      this.on('end', function () {
       // var bowerJson = this.dest.readJSON('bower.json');
        // https://github.com/yeoman/generator-mocha/issues/28
        this.invoke(this.options['test-framework'], {
            options: {
              'skip-message': this.options['skip-install-message'],
              'skip-install': this.options['skip-install']
            }
        });
      }.bind(this));
    }
  });

}
