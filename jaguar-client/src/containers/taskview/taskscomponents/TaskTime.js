import React, {Component} from 'react';
import { graphql } from "react-apollo";
import {AddTimeTask} from '../../apollo-graphql/taskQueries';
import { List, Transition, Accordion } from 'semantic-ui-react';

class TaskComplete extends Component {
    render() {
        const _complete = async () => {
            await this.props.complete({
                variables: {_id: this.props._id, iscompleted: true, completeddate: this.props.completeddate},
                refetchQueries: [{ query: this.props.updateQuery, variables: this.props.variables}]
            })
        };
        return(
            <Transition animation='tada' duration={200} visible={true}>
                <List.Icon
                    name='check circle'
                    size='large'
                    verticalAlign='middle'
                    style={{
                        paddingRight: '.5em',
                    }}
                    onClick={() => _complete()}
                />
            </Transition>
            <Accordion>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>

    </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
            <p>
                A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                {' '}welcome guest in many households across the world.
            </p>
            </Accordion.Content>
        )
    }
}



export default graphql(completeTask,{
    name: 'complete',
})(TaskComplete);