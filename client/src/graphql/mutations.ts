import { DocumentNode, gql } from "@apollo/client"


// AUTH MUTATIONS
export const LOGIN_MUTATION: DocumentNode = gql`
    mutation Login($userName: String!, $password: String!) {
      login(userName: $userName, password: $password) {
        id
        token
      }
    }
  `
export const SIGNUP_MUTATION: DocumentNode = gql`
    mutation CreateUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $userName: String!
      $password: String!
    ) {
      createUser(
        firstName: $firstName
        lastName: $lastName
        email: $email
        userName: $userName
        password: $password
      ) {
        id
        token
        userName
      }
    }
  `
