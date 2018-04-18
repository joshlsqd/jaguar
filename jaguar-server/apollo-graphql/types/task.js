import User from "../../models/user";
import Time from "../../models/time";
import PlannedTime from "../../models/plannedtime";
import Priority from "../../models/priority";
import Group from "../../models/group";

const TaskType = `
    type Task {
        _id: String
        tasktitle: String
        taskdescription: String
        isCompleted: Boolean
        plandate: String
        taskstatus: String
        taskcurrentowner: User
        taskpriorowners: [User]
        tasktime: [Time]
        taskplannedtime: [PlannedTime]
        plannedcompletiondate: String
        duedate: String
        priority: Priority
        group: Group
        organization: Organization
    }
`;

const TaskQuery = `
    allTasks: [Task]
    task(_id: String): Task
    tasksByUser(taskcurrentowner: String): [Task]
`;

const TaskMutation = `
    createTask(
        tasktitle: String,
        taskdescription: String,
        taskcurrentowner: String,
        plandate: String,
) : Task
`;

const TaskQueryResolver = {
    allTasks: async (parent, args, {Task}) => {
        const tasks = await Task.find({});
        return tasks.map(task => {
            task._id = task._id.toString();
            return task
        })
    },
    task: async (parent, args, {Task}) => {
        return await Task.findById(args._id.toString())
    },
    tasksByUser: async (parent, args, {Task}) => {
        const owner = await User.findById(args.taskcurrentowner.toString());
        return await Task.find({taskcurrentowner: owner})
    },
};

const TaskNested = {
    taskcurrentowner: async ({taskcurrentowner}) => {
        return await User.findById(taskcurrentowner)
    },
    tasktime: async ({_id}) => {
        return (await Time.find({task: _id}))
    },
    taskplannedtime: async ({_id}) => {
        return (await PlannedTime.find({task: _id}))
    },
    priority: async ({_id}) => {
        return (await Priority.find({task: _id}))
    },
    group: async ({_id}) => {
        return (await Group.find({task: _id}))
    },
    organization: async ({_id}) => {
        return (await PlannedTime.find({task: _id}))
    },
};

const TaskMutationResolver ={
    createTask: async (parent, args, { Task, User }) => {
        console.log(args);
        let task = await new Task(args).save();
        let owner = await User.findById(args.taskcurrentowner);
        owner.tasks.push(task._id);
        await owner.save();
        return task
    }
}; 

export {TaskType, TaskMutation, TaskQuery, TaskQueryResolver, TaskNested, TaskMutationResolver};
