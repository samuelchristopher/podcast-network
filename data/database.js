import { MongoClient } from 'mongodb';

let db;
(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL);
})();

export default db
