import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Segment, Divider, Dimmer, Loader} from 'semantic-ui-react';
import decode from 'jwt-decode';
import moment from 'moment';
import {tasksByDay} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
import TaskComplete from './taskscomponents/TaskComplete';

const token = localStorage.getItem('token');

class TaskDay extends Component {

    render() {
        const { day } = this.props;
        const today = moment(Date.now()).format('YYYY-MM-DD');
        const { user } = decode(token);
        const variables = {taskcurrentowner: user._id, iscompleted: false, plandate: day};
        return(
            <Query query={tasksByDay} variables={variables}>
                { ({ loading, error, data }) => {
                    if (loading) return (
                        <div>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </div>);
                    if (error) return <p>Error :(</p>;
                    return <div>
                        <Segment>
                            <Header>{day}</Header>
                            <Divider section />
                            <List>
                                {data.tasksByDay.map(({_id, tasktitle}) => (
                                    <List.Item key={_id}>
                                        <TaskComplete
                                            _id={_id}
                                            completeddate={today}
                                            updateQuery={tasksByDay}
                                            variables={variables}
                                        />
                                        <List.Icon name='hourglass empty' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>{tasktitle}</List.Header>
                                            <List.Description as='a'>text tbd</List.Description>
                                        </List.Content>
                                        <Divider section />
                                    </List.Item>
                                ))
                                }
                            </List>
                            <TaskForm
                                taskcurrentowner={user._id}
                                plandate={day}
                                updateQuery={tasksByDay}
                                variables={variables}
                            />
                        </Segment>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default TaskDay;