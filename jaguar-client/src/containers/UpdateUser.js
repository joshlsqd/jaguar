
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation, graphql, compose } from "react-apollo";
import { Message, Form, Button, Input, Container, Header, Icon } from 'semantic-ui-react';
import setCurrentUser from './apollo-graphql/setCurrentUser';
import getCurrentUser from "./apollo-graphql/getCurrentUser";
import LOGIN_USER from "./apollo-graphql/loginUser";
import './UpdateUser.css';
import gql from 'graphql-tag';


const UPDATE_USER = gql`
mutation update($_id: String!, $username: String, $profileImageUrl: String) {
 updateUser(_id: $_id, username: $username, profileImageUrl: $profileImageUrl) {
        _id
        username
        profileImageUrl 
  }
}
`;

class UserView extends Component {
    state = {
        username: "",
        profileImageUrl: ""
    };

    render() {
        const { username, profileImageUrl  } = this.state;
        const { CurrentUser } = this.props
        const success = [];

        return(
            <Mutation mutation={UPDATE_USER}>
            {(update, { data, loading }) => {
            return (  
                <Container text style={{ marginTop: '7em' }}>
                    <Header as="h2">Update User</Header>
                        <Form onSubmit={async e => {
                            e.preventDefault();
                            const response = await update({
                                variables: { _id: CurrentUser._id, username, profileImageUrl }
                            });
                            success.push(response.data)
                            console.log(success);
                        }}>
                        <Form.Field>
                               email: {CurrentUser.email}
                        </Form.Field>

                        <Form.Field>
                            <input
                                placeholder={CurrentUser.username}
                                value={username}
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <input
                                placeholder={CurrentUser.profileImageUrl}
                                value={profileImageUrl}
                                onChange={e => this.setState({ profileImageUrl: e.target.value })}
                            />
                        </Form.Field>
                        <Button floated='right' type="submit"><i className="material-icons left">whatshot</i>Update</Button>
                     </Form>
                    {/* {success.length ? (
                        <Message> "hoooray" </Message>
                    ) : null} */}
                </Container>
            );
        }}
            </Mutation>
            );
        }
    }
                
                
export default compose(
graphql(getCurrentUser, {
props: ({ data: { CurrentUser } }) => ({
CurrentUser 
})
})
)(UserView)




