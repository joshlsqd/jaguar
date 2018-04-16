import gql from 'graphql-tag';

const ADD_USER = gql`
mutation signup($username: String!, $password: String!, $email: String!) {
  signup(username: $username, password: $password, email: $email) {
    ok
    user {
        _id
        email
        username
        profileImageUrl
        }
    errors {
      path
      message
    }
  }
}
`;

export default ADD_USER;