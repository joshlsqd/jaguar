import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';
import mocks from './mocks';

const typeDefs = `
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
    type Task {
        _id: String
        tasktitle: String
        taskdescription: String
    }
    type Query {
        allTasks: [Task]
    }
    type Mutation {
        createTask(
            tasktitle: String,
            taskdescription: String
        ) : Task
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

addMockFunctionsToSchema({ schema, mocks });

export default schema;