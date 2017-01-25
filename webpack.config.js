var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'Mkxmlbuilder';
var outputFileName = 'mkxmlbuilder';

var plugins = [
    new ExtractTextPlugin("mkxmlbuilder.min.css", {allChunks: false})
], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = outputFileName + '.min.js';
} else {
  outputFile = outputFileName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    "jquery": "jQuery",
    "bootstrap": "bootstrap"
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
    { 
        test: /\.css$/, 
        loader: "style-loader!css-loader",
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/
      // }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
