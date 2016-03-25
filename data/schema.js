import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let counter = 24;

let query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    counter: {
      type: GraphQLInt,
      resolve() {
        return counter;
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
  query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve() {
          return counter++;
        }
      }
    })
  })
});

export default schema;
