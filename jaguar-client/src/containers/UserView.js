import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import TaskToday from './taskview/TaskToday'

class UserView extends Component {

    render() {
        return(
            <Container style={{ marginTop: '7em' }}>
                <TaskToday/>
            </Container>
        )
    }
}

export default UserView;