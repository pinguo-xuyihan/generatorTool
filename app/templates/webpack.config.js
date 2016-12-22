var webpack = require('webpack');
var path = require('path');

module.exports = {
	
	entry: './app.js',

	output: {

		filename : 'bundle.js',
		path     :  './build/',
		sourceMapFilename : 'bundle.map.js',
		
	},
	devtool: "source-map",

	module: {

		loaders:[
			{ 
				test: /\.css$/, 
				loader: 'style-loader!css-loader' 
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
			},
			<%if(includeReactJS){%>
			{ 	
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader',
				query : {
					presets:['react'],
				}
			},
			{
                test: [
                    /component\.jsx$/, // select component by RegExp
                ],
                loader: "react-proxy-loader"
            }
			<%}%>
			<%if(supportECMA6){%>
			{ 	
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader',
				query : {
					presets:['es2015'],
				}
			},
			<%}%>
			// TODO 

			// { 
			// 	test: require.resolve("jquery"), 
			// 	loader: "expose-loader?jQuery" 
			// },
		]
	},

	resolve : {
	    alias: {
	        Page : path.resolve(__dirname, 'app/page/'),
	        <%if(includeJqueryPro){%>
	        Widget : path.resolve(__dirname , 'app/widget'),
	        <%}%>
	        <%if(includeReactJS){%>
	        Components : path.resolve(__dirname , 'app/components'),
	       	<%}%>
	    }
	},
	
	externals: {
	    // require("jquery") is external and available
	    //  on the global var jQuery
	    <%if(includeJqueryPro){%>
	    "jquery": "jQuery"
	    <%}%>
	},

	devServer: {
        hot: true,
        inline: true
    },

    plugins: [
    	new webpack.NoErrorsPlugin(), 
      	new webpack.HotModuleReplacementPlugin()
     //  	new webpack.optimize.CommonsChunkPlugin({
	    //    name : 'vendor',
	    //    filename : 'vendor.bundle.js'
	    // })
    ]
};
