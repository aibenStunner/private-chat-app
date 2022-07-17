import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
  }

  input UserInput {
    firstName: String!
    lastName: String
    email: String
    password: String
  }

  input UserSignInput {
    email: String
    password: String
  }

  type Mutation {
    signUpUser(newUser: UserInput!): User
    signInUser(userSignIn: UserSignInput!): Token
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String
  }

  type Token {
    token: String!
  }
`;

export default typeDefs;
