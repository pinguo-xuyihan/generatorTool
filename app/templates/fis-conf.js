/**
 * @file fis config file
 */

/*******************************************
set namespace ; require file by modular way 
********************************************/

fis.config.set('namespace', '<%= appname %>');

/************************************
set domain to make sure that you 
can get back files from corect position
*************************************/


// fis.match('*.{js,css,png,gif}', {
//     domain:  '/admin/' +  fis.get('namespace')
// });

/*******************************************
deploy file to remote machine 
demo : fis3 relase xuxu -w
********************************************/

fis.media('debug').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
})

fis.media('remote').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://localhost:80/receiver.php',
        to: 'E:/workspace/fundmarket/admin/src/main/webapp'
    }),
});

fis.media('remote').match('*.{js,css,jpg,png,gif,woff}', {
    url: '/admin$0'
})

fis.media('gaogao').match('*.{js,css,jpg,png,gif,woff}', {
    url: '/admin$0'
})

/**********************
     parse files 
**********************/



fis.match('*.tmpl', {
    rExt: '.js',
    parser: fis.plugin('bdtmpl') 
});



fis.match('*.less', {
    rExt: '.css',
    parser: fis.plugin('less')
});

/**********************
     optimize files 
**********************/

// fis.match('*.{css,less}', {
//     optimizer: fis.plugin('clean-css')
// });
// fis.match('*.js', {
//     optimizer: fis.plugin('uglify-js')
// });
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor', {
      type : 'pngquant'
    })
});


// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});
fis.config.set('settings.spriter.csssprites', {
    scale: 0.5
});
// 对 CSS 进行图片合并
fis.match('static/css/achievement/*.css', {
    packTo: 'static/css/achievement-icon.css',
    useSprite: true
});

// fis parse es6 to es5

<%if(supportECMA6){%>
fis.match('app/**.js', {
    parser: fis.plugin('babel', {
        blacklist: ["useStrict"],
        optional: ["es7.decorators", "es7.classProperties"]
    })
    rExt: '.js'
});
<%}%>

// fis.match('static/js/{controller,model,widget,initapp}.js', {
//     parser: fis.plugin('babel')
// });

// fis.match('test/data/**.js', {
//     parser: fis.plugin('babel')
// });

/**********************
     pack files 
**********************/

fis.match('::package', {
    packager: fis.plugin('map', {
        'static/common-lib.js': [
            'app/common/lib/**.js',
        ],
        'static/common-js.js': [
            'app/common/js/**.js',
        ],
        'static/page-js.js': [
            'app/page/**.js',
        ],
        'static/widget-js.js': [
            'app/page/**.js',
        ],

    })
});

/**********************
     Modular files 
**********************/

fis.match('app/page/**.js', {
    useHash: true,
    isMod: true
});
fis.match('app/widget/**.js', {
    useHash: true,
    isMod: true
});



/**********************
     preload plugin 
**********************/

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});
fis.config.set('settings.postpackager.autoload.beautyResourceMap', true);

fis.match('*.{js,css,png}', {
    useHash: true
});

fis.match('*.png', {
    useMap : true
});

<%if(includeJqueryMultiple || includeJquerySPA){%>
fis.match('node_modules/jquery/dist/jquery.min.js', {
    useHash: true,
    isMod: true
});
fis.hook('commonjs', {
  paths: {
    jquery: 'node_modules/jquery/dist/jquery.min.js'
  }
});
<%}%>



fis.config.set('project.watch.usePolling', true);


