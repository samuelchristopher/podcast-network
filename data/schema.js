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
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  globalIdField
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
      imgUrl: {
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
      id: globalIdField('Store'),
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

  let addPodcastMutation = mutationWithClientMutationId({
    name: 'AddPodcast',
    inputFields: {
      author: {
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
      date: {
        type: new GraphQLNonNull(GraphQLString)
      },
      url: {
        type: new GraphQLNonNull(GraphQLString)
      },
      imgUrl: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    outputFields: {
      podcastEdge: {
        type: podcastConnection.edgeType,
        resolve(obj) {
          return {
            node: obj.ops[0],
            cursor: obj.insertedId
          };
        }
      },
      store: {
        type: storeType,
        resolve() {
          return store;
        }
      }
    },
    mutateAndGetPayload: ({ author, title, date, url, imgUrl }) => {
      return db.collection('podcasts').insertOne({
        author,
        title,
        date,
        url,
        imgUrl
      });
    }
  });

  let mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      addPodcast: addPodcastMutation
    })
  });

  let schema = new GraphQLSchema({
    query,
    mutation
  });

  return schema;
};
export default Schema;
