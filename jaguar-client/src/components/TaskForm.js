import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const  CreateTask = gql`
    mutation CreateTask($tasktitle: String!){
        createTask(tasktitle: $tasktitle){
            _id
            tasktitle
        }
    }
`;

const TaskForm = () => {
    let ;


    return (
        <Mutation mutation={CreateTask}>
            {(createTask, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            createTask({ variables: { tasktitle: input.value } });
                            input.value = "";
                        }}
                    >
                        <input
                            ref={node => {
                                inputuser = node;
                            }}
                        />
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            )}
        </Mutation>
    );
};

export default TaskForm;