import Time from '../../models/time';
import Task from '../../models/task';
import PlannedTime from '../../models/plannedtime';
import UserTypeOrg from '../../models/usertypeorg';
import Organization from '../../models/organization';
require("dotenv").load();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../config';

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
        jwt: String
    }
`;

const UserQuery =`
  allUsers: [User]
  user(_id: String): User
  userEmail(email: String): User
`;

const UserMutation = `
    updateUser(
        usertypeorg: String
        organization: String
    ) : User
    login(
        email: String!, 
        password: String!
    ): User
    signup(
        email: String!, 
        password: String!, 
        username: String!,
        profileImageUrl: String
        ): User
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
    userEmail: async (parent, args, {User}) => {
        return await User.findOne(args)
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
    updateUser: async (parent, args, {User}) => {
        let user = await User.findByIdAndUpdate(args._id.toString(),);
        user._id = user._id.toString();
        return user
    },
    login: function(_, { email, password }, {User}, ctx) {
        // find user by email
        return User.findOne({ email }).then((user) => {
            if (user) {
                // validate password
                return bcrypt.compare(password, user.password).then((res) => {
                    if (res) {
                        // create jwt
                        const token = jwt.sign({
                            id: user.id,
                            email: user.email,
                        }, JWT_SECRET);
                        user.jwt = token;
                        ctx.user = Promise.resolve(user);
                        return user;
                    }
                    return Promise.reject('password incorrect');
                });
            }
            return Promise.reject('email not found');
        });
    },
    signup: function(_, { email, password, username, profileImageUrl }, {User}, ctx) {
        // find user by email
        return User.findOne({ where: { email } }).then((existing) => {
            if (!existing) {
                // hash password and create user
                return bcrypt.hash(password, 10).then(hash => User.create({
                    email,
                    password: hash,
                    username: username || email,
                })).then((user) => {
                    const { id } = user;
                    const token = jwt.sign({ id, email }, JWT_SECRET);
                    user.jwt = token;
                    ctx.user = Promise.resolve(user);
                    return user;
                });
            }
            return Promise.reject('email already exists'); // email already exists
        });
    },
};

export {UserType, UserMutation, UserQuery, UserMutationResolver, UserQueryResolver, UserNested};