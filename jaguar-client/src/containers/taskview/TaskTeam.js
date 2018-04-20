import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Segment, Dimmer, Loader, Transition} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import {tasksByUser} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskComplete from './taskscomponents/TaskComplete';

const token = localStorage.getItem('token');

class TaskUnplanned extends Component {

    render() {

        const { user } = decode(token);
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const variables = {taskcurrentowner: user._id, iscompleted: false};

        return(
            <Query query={tasksByUser} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <Segment style={{width: '100%'}}>
                        <Header>Backlog</Header>
                        <TaskForm
                            taskcurrentowner={user._id}
                            updateQuery={tasksByUser}
                            variables={variables}
                        />
                        <Transition.Group
                            as={List}
                            duration={200}
                            divided
                            relaxed
                            size='large'
                            style={{overflowY: 'auto', overflowX: 'hidden', minHeight: '300px', maxHeight: '325px'}}
                        >
                            {data.tasksByUser.map(({_id, tasktitle}) => (
                                <List.Item key={_id}>
                                    <TaskComplete
                                        _id={_id}
                                        completeddate={today}
                                        updateQuery={tasksByUser}
                                        variables={variables}
                                    />
                                    <List.Icon name='hourglass empty' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a'>{tasktitle}</List.Header>
                                        <List.Description as='a'>text tbd</List.Description>
                                    </List.Content>
                                </List.Item>
                            ))
                            }
                        </Transition.Group>
                    </Segment>;
                }
                }
            </Query>
        )
    }
}



export default TaskUnplanned;