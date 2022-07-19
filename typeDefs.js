import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]
    messagesByUser(receiverId: Int!): [Message]
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
    createMessage(receiverId: Int!, text: String!): Message
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

  scalar Date

  type Message {
    id: ID!
    text: String!
    receiverId: Int!
    senderId: Int!
    createdAt: Date!
  }
`;

export default typeDefs;
