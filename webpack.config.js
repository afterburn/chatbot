const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
	devtool: debug ? 'inline-sourcemap' : null,
	entry: './client/src/main.js',
	module: {
		rules: [
      {
				test: /\.scss$/,
				use: [
				  { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
				]
      },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			}
		]
	},
	output: {
		path: __dirname + '/client/dist/',
		filename: 'bundle.js'
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	]
}