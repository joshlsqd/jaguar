import User from "../../models/user";
import UserTypeOrg from "../../models/usertypeteam";
import {teamError} from "../formatErrors";
import requiresAuth from '../permissions';

const TeamType = `
    type Team {
        _id: String
        teamtitle: String!
        teamdescription: String
        owner: User
        users: [User]
    }
    
    type CreateTeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }
`;

const TeamQuery = `
    allTeams: [Team]
    team(_id: String): Team
`;

const TeamMutation = `
    createTeam(
        teamtitle: String!,
        teamdescription: String,
        owner: String,
    ) : CreateTeamResponse
`;

const TeamQueryResolver = {
    allTeams: async (parent, args, {Team}) => {
        const teams = await Team.find({});
        return teams.map(team => {
            team._id = team._id.toString();
            return team
        })
    },
    team: async (parent, args, {Team}) => {
        return await Team.findById(args._id.toString())
    },
};

const TeamNested = {
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
};

const TeamMutationResolver ={
    createTeam: requiresAuth.createResolver(async (parent, {teamtitle, teamdescription, owner}, {Team}) => {
        try {
            const err = [];
            let teamtitleErr = await teamError(teamtitle);
            if(teamtitleErr) { err.push(teamtitleErr)}
            if(!err.length) {
                const teamanization = await Team.create({
                    teamtitle,
                    teamdescription,
                    owner,
                });
                return {
                    ok: true,
                    team,
                };
            } else {
                return {
                    ok: false,
                    errors: err,
                }
            }
        } catch (e) {
            return {
                ok: false,
                errors: [{path: 'teamtitle', message: 'something did not go well'}]
            }
        }
    })
};

export {TeamType, TeamMutation, TeamQuery, TeamQueryResolver, TeamNested, TeamMutationResolver};
