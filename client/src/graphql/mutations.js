import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignUpUser($newUser: UserInput!) {
    signUpUser(newUser: $newUser) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignInUser($userSignIn: UserSignInput!) {
    signInUser(userSignIn: $userSignIn) {
      token
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation CreateMessage($receiverId: Int!, $text: String!) {
    createMessage(receiverId: $receiverId, text: $text) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`;
