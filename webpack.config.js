const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/dist',
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            filename: 'index.html',
            template: './src/index.html'  
        }),
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      }
}