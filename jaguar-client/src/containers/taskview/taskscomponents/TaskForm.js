import React, {Component} from 'react';
import { Mutation } from "react-apollo";
import { Input, Form } from 'semantic-ui-react';
import {createTask} from "../../apollo-graphql/taskQueries";


class TaskForm extends Component {
    state = {
        newTask: "",
    };

    render() {
        const { newTask } = this.state;
        const {taskcurrentowner, plandate} = this.props;
        console.log(plandate);
        return (
            <Mutation mutation={createTask}>
                {(createTask, {data}) => {
                    return (
                        <div>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const response = await createTask({
                                        variables: {tasktitle: newTask, taskcurrentowner, plandate}
                                    });
                                    console.log(response);
                                    this.setState({newTask: ""});
                                }}
                            >
                                <Input
                                    value={newTask}
                                    type='text'
                                    action={{icon: 'add circle'}}
                                    placeholder='add task...'
                                    onChange={e => this.setState({newTask: e.target.value})}
                                />
                            </Form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
};

export default TaskForm;