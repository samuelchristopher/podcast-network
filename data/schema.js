import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';


let Schema = (db) => {
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
      }
    })
  });

  let query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      podcasts: {
        type: new GraphQLList(podcastType),
        resolve() {
         return db.collection('podcasts-test').find({}).toArray();
        }
      },
      message: {
        type: GraphQLString,
        resolve() {
          return "Hello graphql";
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
