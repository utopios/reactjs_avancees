import { ApolloServer, gql } from 'apollo-server';
import { users } from './data.js';

let userData = [...users];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users(offset: Int, limit: Int): [User!]!
  }

  type Mutation {
    addUser(name: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: (_, { offset = 0, limit = 10 }) => userData.slice(offset, offset + limit),
  },
  Mutation: {
    addUser: (_, { name }) => {
      const user = { id: `${userData.length + 1}`, name };
      userData.push(user);
      return user;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
