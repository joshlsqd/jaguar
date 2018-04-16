import gql from 'graphql-tag';

const defaults = {
    CurrentUser: {
        __typename: 'CurrentUser',
        _id: "",
        email: "",
        username: "",
        profileImageUrl:"",
        isLoggedIn: false
    },
};

const resolvers = {
    Mutation: {
        setCurrentUser: (_, {_id, email, username, profileImageUrl}, {cache}) => {
            const query = gql`
                query getCurrentUser {
                    CurrentUser @client {
                        __typename
                        _id
                        email
                        username
                        profileImageUrl
                    }
                }`;
            const previousState = cache.readQuery({ query });
            const data = {
                ...previousState,
                CurrentUser: {
                    ...previousState.CurrentUser,
                    _id,
                    email,
                    username,
                    profileImageUrl
                }
            };
            cache.writeData({ query, data })
        },
    }
};

export {defaults, resolvers};