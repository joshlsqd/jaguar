import User from "../../models/user";
import UserTypeOrg from "../../models/usertypeorg";

const OrganizationType = `
    type Organization {
        _id: String
        organizationtitle: String
        organizationdescription: String
        usertypes: [UserTypeOrg]
        users: [User]
    }
`;

const OrganizationQuery = `
    allOrganizations: [Organization]
    organization(_id: String): Organization
`;

const OrganizationMutation = `
    createOrganization(
        orgtitle: String,
        orgdescription: String
) : Organization
`;

const OrganizationQueryResolver = {
    allOrganizations: async (parent, args, {Organization}) => {
        const orgs = await Organization.find({});
        return orgs.map(org => {
            org._id = org._id.toString();
            return org
        })
    },
    organization: async (parent, args, {Organization}) => {
        return await Organization.findById(args._id.toString())
    },
};

const OrganizationNested = {
    users: async ({users}) => {
        return (await User.find({users: _id}))
    },
    usertypes: async ({usertypes}) => {
        return (await UserTypeOrg.find({usertypes: _id}))
    },
};

const OrganizationMutationResolver ={
    createOrganization: async (parent, args, { Organization}) => {
        let org = await new Organization(args).save();
        return org
    }
};

export {OrganizationType, OrganizationMutation, OrganizationQuery, OrganizationQueryResolver, OrganizationNested, OrganizationMutationResolver};
