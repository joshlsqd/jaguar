require('dotenv').config();
import express from 'express';
const session = require('express-session');
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './apollo-graphql/schema.js';
import mongoose from "mongoose";
import cors from 'cors';
const MongoStore = require('connect-mongo')(session);
import jwt from 'express-jwt';
import { JWT_SECRET } from './config';


// mongoose models for graphql context
import User from './models/user'
import Time from "./models/time";
import PlannedTime from "./models/plannedtime";
import Priority from "./models/priority";
import Project from "./models/project";
import Group from "./models/group";
import Requirement from "./models/requirement";
import Task from "./models/task";
import UsertypeOrg from "./models/usertypeorg";
import Milestone from "./models/milestone";
import Organization from "./models/organization";

const mongo_uri = `mongodb://JoshCook:password123@ds237669.mlab.com:37669/jaguar`;

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(mongo_uri, {
    keepAlive: true
});

const PORT = 3001;
const app = express();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'kldngo3qnvnfdskgrnophgkjfnksdgn',
    store: new MongoStore({
        url: mongo_uri,
        autoReconnect: true
    })
}));

app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use('/graphql', bodyParser.json(), jwt({
    secret: JWT_SECRET,
    credentialsRequired: false,
}), graphqlExpress(req => ({ schema,
    context: {
        user: req.user ? User.findOne({ where: { id: req.user.id } }) : Promise.resolve(null),
    User, Task, Time, PlannedTime, Organization, UsertypeOrg, Priority, Group, Milestone, Project, Requirement}
})));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, function() {
    console.log(`GraphiQL is now running on http://localhost:${PORT}/graphiql`);
});
