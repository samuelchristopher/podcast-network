import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';

let Schema = (db) => {
  let store = {};

  let podcastType = new GraphQLObjectType({
    name: 'Podcast',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve(obj) {
          return obj._id
        }
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
      podcastConnection: {
        type: podcastConnection.connectionType,
        args: connectionArgs,
        resolve(_, args) {
         return connectionFromPromisedArray(
           db.collection('podcasts').find({}).toArray(),
           args
         );
        }
      }
    })
  });

  let podcastConnection = new connectionDefinitions({
    name: 'Podcast',
    nodeType: podcastType
  });

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
