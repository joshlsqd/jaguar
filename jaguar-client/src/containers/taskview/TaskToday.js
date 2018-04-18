import React, {Component} from 'react';
import { Query } from "react-apollo";
import { List,Header, Segment, Divider} from 'semantic-ui-react';
import moment from 'moment';
import decode from 'jwt-decode';
import {tasksByUser} from "../apollo-graphql/taskQueries";
import TaskForm from './taskscomponents/TaskForm';
const token = localStorage.getItem('token');

class TaskToday extends Component {

    render() {
        const { user } = decode(token);
        return(
            <Query query={tasksByUser} variables={{taskcurrentowner: user._id}}>
                { ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return <div>
                        <Segment>
                            <Header>Today</Header>
                            <Divider section />
                            <List>
                            {data.tasksByUser.map(({_id, tasktitle}) => (
                                <List.Item key={_id}>
                                    <List.Icon name='check circle' size='large' verticalAlign='middle' />
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
                            <TaskForm taskcurrentowner={user._id} plandate={moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss.mmm')}/>
                        </Segment>
                    </div>;
                }
                }
            </Query>
        )
    }
}



export default TaskToday;