const lodash = require('lodash');
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } from 'graphql'

const users = [
    {_id: '11', username: 'josh', email: 'jcook@lynxsolutions.com', password: 'password123', age: 37},
    {_id: '21', username: 'jen', email: 'jholley@lynxsolutions.com', password: 'password123', age: 35},
    {_id: '31', username: 'celeste', email: 'clarson@lynxsolutions.com', password: 'password123', age: 30}
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        profileimageurl: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {_id: {type: GraphQLString}}
            resolve(parent, args) {
                return lodash.find(users, {_id: args._id});
            }
        }
    }
});

const usernew GraphQLSchema({
   query: RootQuery
});


type Query {
  allUsers: [User]
}

type Mutation {
    createUser(
        username: String
        email: String
        password: String
        profileimageurl: String
  ) : User
}


// const userResolvers = {
//     Query: {
//         allUsers: async (parent, args, { User }) => {
//             const users = await User.find({});
//             return users.map(user => {
//                 user._id = user._id.toString();
//                 return user
//             })
//         }
//     },
//     Mutation: {
//         createUser: async (parent, args, { User }) => {
//             const user = await new User(args).save();
//             user._id = user._id.toString();
//             return user
//         }
//     }
// };
//
// export const userSchema = makeExecutableSchema({
//     typeDefs: userTypeDef,
//     resolvers: userResolvers,
// });


// time: [Time]
// plannedtime: [PlannedTime]
// organization: [Organization]