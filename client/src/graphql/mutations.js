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
