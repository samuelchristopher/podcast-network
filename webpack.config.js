// module.exports = {
//   entry: "./js/app.js",
//   output: {
//     path: __dirname + "/public",
//     filename: "bundle.js"
//   },
//   module: {
//     loaders: [{
//         test: /\.js$/, loader: "babel-loader",
//         exclude: /node-modules/,
//         query: {
//           presets: ['react', 'es2015', 'stage-0'],
//           plugins: ['./babelRelayPlugin']
//         }
//       }
//     ]
//   }
// }
var getBabelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('./data/schema.json').data;
var plugin = new getBabelRelayPlugin(schemaData);
module.exports = {
  entry: './js/app.js',
  output: {
    path: __dirname + './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node-modules/, loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [plugin]
        }
      }
    ]
  }
};
