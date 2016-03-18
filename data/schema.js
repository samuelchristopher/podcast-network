// /**
//  *  Copyright (c) 2015, Facebook, Inc.
//  *  All rights reserved.
//  *
//  *  This source code is licensed under the BSD-style license found in the
//  *  LICENSE file in the root directory of this source tree. An additional grant
//  *  of patent rights can be found in the PATENTS file in the same directory.
//  */
//
// import {
//   GraphQLBoolean,
//   GraphQLFloat,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLObjectType,
//   GraphQLSchema,
//   GraphQLString,
// } from 'graphql';
//
// import {
//   connectionArgs,
//   connectionDefinitions,
//   connectionFromArray,
//   fromGlobalId,
//   globalIdField,
//   mutationWithClientMutationId,
//   nodeDefinitions,
// } from 'graphql-relay';
//
// import {
//   // Import methods that your schema can use to interact with your database
//   User,
//   Widget,
//   getUser,
//   getViewer,
//   getWidget,
//   getWidgets,
// } from './database';
//
// /**
//  * We get the node interface and field from the Relay library.
//  *
//  * The first method defines the way we resolve an ID to its object.
//  * The second defines the way we resolve an object to its GraphQL type.
//  */
// var {nodeInterface, nodeField} = nodeDefinitions(
//   (globalId) => {
//     var {type, id} = fromGlobalId(globalId);
//     if (type === 'User') {
//       return getUser(id);
//     } else if (type === 'Widget') {
//       return getWidget(id);
//     } else {
//       return null;
//     }
//   },
//   (obj) => {
//     if (obj instanceof User) {
//       return userType;
//     } else if (obj instanceof Widget)  {
//       return widgetType;
//     } else {
//       return null;
//     }
//   }
// );
//
// /**
//  * Define your own types here
//  */
//
// var userType = new GraphQLObjectType({
//   name: 'User',
//   description: 'A person who uses our app',
//   fields: () => ({
//     id: globalIdField('User'),
//     widgets: {
//       type: widgetConnection,
//       description: 'A person\'s collection of widgets',
//       args: connectionArgs,
//       resolve: (_, args) => connectionFromArray(getWidgets(), args),
//     },
//   }),
//   interfaces: [nodeInterface],
// });
//
// var widgetType = new GraphQLObjectType({
//   name: 'Widget',
//   description: 'A shiny widget',
//   fields: () => ({
//     id: globalIdField('Widget'),
//     name: {
//       type: GraphQLString,
//       description: 'The name of the widget',
//     },
//   }),
//   interfaces: [nodeInterface],
// });
//
// /**
//  * Define your own connection types here
//  */
// var {connectionType: widgetConnection} =
//   connectionDefinitions({name: 'Widget', nodeType: widgetType});
//
// /**
//  * This is the type that will be the root of our query,
//  * and the entry point into our schema.
//  */
// var queryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: () => ({
//     node: nodeField,
//     // Add your own root fields here
//     viewer: {
//       type: userType,
//       resolve: () => getViewer(),
//     },
//   }),
// });
//
// /**
//  * This is the type that will be the root of our mutations,
//  * and the entry point into performing writes in our schema.
//  */
// var mutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     // Add your own mutations here
//   })
// });
//
// /**
//  * Finally, we construct our schema (whose starting query type is the query
//  * type we defined above) and export it.
//  */
// export var Schema = new GraphQLSchema({
//   query: queryType,
//   // Uncomment the following after adding some mutation fields:
//   // mutation: mutationType
// });

/////------- Podcast Network -----////
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import database from './database';

const Podcast = new GraphQLObjectType({
  name: 'Podcast',
  description: 'It is a representation of a podcast',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(podcast) {
          return podcast._id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(podcast) {
          return podcast.title;
        }
      },
      author: {
        type: GraphQLString,
        resolve(podcast) {
          return podcast.author;
        }
      },
      url: {
        type: GraphQLString,
        resolve(podcast) {
          return podcast.url;
        }
      },
      date: {
        type: GraphQLString,
        resolve(podcast) {
          return podcast.date;
        }
      },
    }
  }
})

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query',
  fields: () => {
    return {
      podcasts: {
        type: new GraphQLList(Podcast),
        args: {
          id: {
            type: GraphQLString
          },
          title: {
            type: GraphQLString
          },
          date: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return database.find({}, (err, podcasts) => {
            if(err) {
              return err;
            } else {
              return podcasts;
            }
          });
        }
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Used to create podcasts',
  fields: () => {
    return {
      addPodcast: {
        type: Podcast,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          author: {
            type: new GraphQLNonNull(GraphQLString)
          },
          date: {
            type: new GraphQLNonNull(GraphQLString)
          },
          url: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          const { title, author, date, url } = args
          const newPodcast = new database({
            title,
            author,
            date,
            url
          });
          return newPodcast.save((err) => {
            if(err) {
              console.log(err)
            }
          });
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query,
  mutation
});

export default Schema;
