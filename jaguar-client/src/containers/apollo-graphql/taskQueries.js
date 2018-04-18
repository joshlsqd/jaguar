import gql from "graphql-tag";

const allTasks= gql`
 {
  allTasks {
    _id
    tasktitle
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;

const task = gql`
 {
  task {
    _id
    tasktitle
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;
const tasksByUser = gql`
 query tasksByUser($taskcurrentowner: String!){
  tasksByUser(taskcurrentowner: $taskcurrentowner) {
    _id
    tasktitle
    taskcurrentowner {
      _id
      username
    }
  }
}
 `;

const createTask = gql`
mutation createTask($tasktitle: String, $taskcurrentowner: String, $plandate: String) {
    createTask(tasktitle: $tasktitle, taskcurrentowner: $taskcurrentowner, plandate: $plandate) {
        _id
        tasktitle
        taskcurrentowner{
            username
            }
        plandate
        }
    }
`;

export {allTasks, task, tasksByUser, createTask}