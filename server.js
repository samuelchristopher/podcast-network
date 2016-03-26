import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import fs from 'fs';

let app = express();

app.use(express.static('public'));

(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL);
  let schema = Schema(db);

  app.use('/data', GraphQLHTTP({
    graphiql: true,
    schema
  }));
  app.listen(3000, () => console.log('Server started!') );

  let json = await graphql(schema, introspectionQuery);
  fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
    if(err) throw err;
    console.log('JSON schema created');
  });

})();
