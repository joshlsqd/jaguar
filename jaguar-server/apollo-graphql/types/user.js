import Time from '../../models/time';
import Task from '../../models/task';
import PlannedTime from '../../models/plannedtime';
import UserTypeOrg from '../../models/usertypeorg';
import Organization from '../../models/organization';
require("dotenv").load();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../config';
import {emailError, usernameError, passwordError} from '../formatErrors';
// import requiresAuth from '../permissions';

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
    
        type AuthPayload {
            token: String
            user: User
        }
        type Error {
            path: String!
            message: String 
        }
        type RegisterResponse {
            ok: Boolean!
            user: User
            errors: [Error!] 
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
    ): AuthPayload
    signup(
        email: String!, 
        password: String!, 
        username: String!
        ): RegisterResponse
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
    updateUser: async (parent, args,{User}, info) => {
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
                        return {
                            token: jwt.sign({ userId: user._id }, JWT_SECRET),
                            user
                        }
                    }
                    return Promise.reject('password incorrect');
                });
            }
            return Promise.reject('email not found');
        });
    },
    signup: async (_, { email, password, username }, {User}) => {
        try {
            const err = [];
            let emailErr = await emailError(email);
            let passwordErr = await passwordError(password);
            let usernameErr = await usernameError(username);
            if(emailErr) { err.push(emailErr)}
            if(passwordErr) { err.push(passwordErr)}
            if(usernameErr) { err.push(usernameErr)}

            if(!err.length) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                return {
                    ok: true,
                    user,
                };
            } else {
                return {
                    ok: false,
                    errors: err,
                }
            }
        } catch (e) {
            console.log(e.errors);
            return {
                ok: false,
                errors: [{path: 'Signup', message: 'something did not go well'}]
            }
        }
    },
};
export {UserType, UserMutation, UserQuery, UserMutationResolver, UserQueryResolver, UserNested};