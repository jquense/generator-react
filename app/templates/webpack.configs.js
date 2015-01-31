
var config = {
      experimental: true,
      loose: ['all'],

      whitelist: [
        'es6.classes',
        'es6.modules',
        'es6.arrowFunctions',
        'es6.properties.computed',
        'es6.properties.shorthand',
        'es6.parameters.default',
        'es6.parameters.rest',
        'es6.templateLiterals',
        'es7.objectSpread',
        'react'
      ]
    }

module.exports = {

  to5Config: config,

  dev: {
    devtool: 'source-map',
    entry: './dev/dev.jsx',
    output: {
      filename: 'bundle.js',
      path: __dirname
    },
    
    module: {
      loaders: [
        { test: /\.css$/,  loader: "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { 
          test: /\.jsx$|\.js$/, 
          loader: '6to5-loader', 
          exclude: /node_modules/,
          query: config
        }
      ]
    },
  },

  test: {
    devtool: 'inline-source-map',
    cache: true,
    module: {
      loaders: [
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { test: /sinon-chai/, loader: "imports?define=>false" },
        { 
          test: /\.jsx$|\.js$/, 
          loader: '6to5-loader', 
          exclude: /node_modules/,
          query: config
        }
      ]
    },
  }
}