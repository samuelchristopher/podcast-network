import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';

let app = express();

app.use(express.static('public'));

(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL);
  app.use('/data', GraphQLHTTP({
    graphiql: true,
    schema: schema(db)
  }));
  app.listen(3000, () => console.log('Server started!') );
})();
