import gql from 'graphql-tag'

const setCurrentUser = gql`
  mutation setCurrentUser($_id: String!, $email: String!, $username: String, $profileImageUrl: String) {
    setCurrentUser(_id: $_id, email: $email, username: $username, profileImageUrl: $profileImageUrl) @client {
      _id
      email
      username
      profileImageUrl
    }
  }
`;

export default setCurrentUser;