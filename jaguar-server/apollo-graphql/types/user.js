import Time from '../../models/time';
import Task from '../../models/task';
import PlannedTime from '../../models/plannedtime';
import UserTypeOrg from '../../models/usertypeorg';
import Organization from '../../models/organization';

const UserType = `
        type User {
        _id: String 
        email: String
        username: String
        password: String
        profileImageUrl: String
        tasks: [Task]
        time: [Time]
        plannedtime: [PlannedTime]
        usertypeorg: [UserTypeOrg]
        organization: [Organization]
    }
`;

const UserQuery =`
  allUsers: [User]
  user(_id: String): User 
`;

const UserMutation = `
    createUser(
        username: String
        email: String
        password: String
        profileImageUrl: String
    ) : User
    updateUser(
        usertypeorg: String
        organization: String
    ) : User
`;

const UserQueryResolver = {
    allUsers: async (parent, args, {User}) => {
        const users = await User.find({});
        return users.map(user => {
            user._id = user._id.toString();
            return user
        })
    },
    user: async (parent, args, {User}) => {
        return await User.findById(args._id.toString())
    },
};

const UserNested =  {
    tasks: async ({_id}) => {
        return (await Task.find({taskcurrentowner: _id}))
    },
    time: async ({_id}) => {
        return (await Time.find({user: _id}))
    },
    plannedtime: async ({_id}) => {
        return (await PlannedTime.find({user: _id}))
    },
    usertypeorg: async ({_id}) => {
        return (await UserTypeOrg.find({user: _id}))
    },
    organization: async ({_id}) => {
        return (await Organization.find({user: _id}))
    }
};

const UserMutationResolver = {
    createUser: async (parent, args, { User }) => {
        let user = await new User(args).save();
        user._id = user._id.toString();
        return user
    },
    updateUser: async (parent, args, { User }) => {
        let user = await User.findByIdAndUpdate(args._id.toString(),);
        user._id = user._id.toString();
        return user
    }
};

export {UserType, UserMutation, UserQuery, UserMutationResolver, UserQueryResolver, UserNested};
