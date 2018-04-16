import gql from 'graphql-tag';

export default gql`
    query {
        CurrentUser @client {
            _id
            email
            username
            profileImageUrl
        }
    }
    `