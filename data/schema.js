import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

// import db from './database';

let Schema = (db) => {
  let store = {};
  let podcastType = new GraphQLObjectType({
    name: 'Podcast',
    fields: () => ({
      _id: {
        type: GraphQLString
      },
      author: {
        type:  GraphQLString
      },
      title: {
        type: GraphQLString
      },
      url: {
        type: GraphQLString
      },
      date: {
        type: GraphQLString
      }
    })
  });

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      podcasts: {
        type: new GraphQLList(podcastType),
        resolve() {
         return db.collection('podcasts').find({}).toArray();
        }
      }
    })
  })

  let query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: storeType,
        resolve() {
          return store
        }
      }
    })
  });

  let schema = new GraphQLSchema({
    query
  });

  return schema;
};
export default Schema;
