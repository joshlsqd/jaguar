// import gql from 'graphql-tag';

const defaults = {
    currentUser: {
        _id: "",
        email: "",
        username: "",
        profileImageUrl:""
    },
    isLoggedin: false,
    visibilityFilter: 'showAll',
    networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false,
    }
};

// const resolvers = {
//     Mutation: {
//         setCurrentUser: (_, {_id, email, username, profileImageUrl}, {cache}) => {
//             const query = gql`
//                 query getCurrentUser {
//                     currentUser @client {
//                         _id
//                         email
//                         username
//                         profileImageUrl
//                     }
//                 }`;
//             const currentUser
//         }
//     }
// }

export {defaults};