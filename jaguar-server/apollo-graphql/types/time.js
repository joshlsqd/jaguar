
const TimeType = `
    type Time {
        _id: String
        time: Float
        date: String
        user: User
        task: Task
    }
`;

const TimeQuery = `
    allTime: [Time]
    time(_id: String): Time
`;

const TimeMutation = `
    createTime(
         _id: String
        time: Float
        date: String
        user: String
        task: String
) : Time
`;

const TimeQueryResolver = {
    allTime: async (parent, args, {Time}) => {
        let time = await Time.find({});
        return time.map(t => {
            t._id = t._id.toString();
            return t
        })
    },
    time: async (parent, args, {Time}) => {
        return await Time.findById(args._id.toString())
    }
};

const TimeNested = {
    task: async ({_id}) => {
        return (await Task.find({time: _id}))
    },
    user: async ({_id}) => {
        return (await User.find({time: _id}))
    },
};

const TimeMutationResolver ={
    createTime: async (parent, args, { Time, Task, User }) => {
        let time = await new Time(args).save();
        let user = await User.findById(args.user);
        user.time.push(time._id);
        await user.save();
        let task = await Task.findById(args.task);
        task.time.push(time._id);
        await task.save();
        return time
    }
};

export {TimeType, TimeQuery, TimeMutation, TimeQueryResolver, TimeNested, TimeMutationResolver};
