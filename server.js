import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';

let app = express();
let db;

app.use(express.static('public'));

MongoClient.connect(process.env.MONGO_URL, (err, database) => {
  if (err) throw err;
  db = database;
  app.use('/data', GraphQLHTTP({
    graphiql: true,
    schema: schema(db)
  }));
  app.listen(3000, () => console.log('Server started!') );
});

app.get('/data/podcasts', (req, res) => {
  db.collection('podcasts-test').find({}).toArray((err, podcasts) => {
    if (err) res.send(err);

    res.json(podcasts);
  });
});
