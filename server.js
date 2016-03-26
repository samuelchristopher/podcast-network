import path from 'path';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import fs from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;
let graphQLServer = express();

let compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      }
    ]
  },
  output: {filename: 'app.js', path: '/'}
});

let app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/data': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: {colors: true}
});
app.use(express.static('public'));

(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL);
  let schema = Schema(db);
  graphQLServer.use('/', GraphQLHTTP({
    graphiql: true,
    schema
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => console.log('Server started!') );
  app.listen(APP_PORT, () => console.log('Server started!') );

  let json = await graphql(schema, introspectionQuery);
  fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
    if(err) throw err;
    console.log('JSON schema created');
  });

})();
