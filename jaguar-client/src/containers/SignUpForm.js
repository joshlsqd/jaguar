import React, {Component} from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {Link} from 'react-router-dom';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react';
// import { AUTH_TOKEN } from '../constants'


const ADD_USER = gql`
mutation signup($username: String!, $password: String!, $email: String!) {
  signup(username: $username, password: $password, email: $email) {
    ok
    errors {
      path
      message
    }
  }
}
`;

class SignUpForm extends Component {
    state = {
        username: "",
        usernameError: "",
        password: "",
        passwordError: "",
        email: "",
        emailError: "",
    };

    render() {
        const {email, username, password, usernameError, emailError, passwordError} = this.state;
        const errorList = [];

        if (usernameError) {errorList.push(usernameError);}
        if (emailError) { errorList.push(emailError);}
        if (passwordError) {errorList.push(passwordError);}

        return (
            <Mutation mutation={ADD_USER}>
            {(signup, {data, loading, error}) => {
            return (
                <Container text style={{ marginTop: '7em' }}>
                    <Header as="h2">sign up</Header>
                        <Form onSubmit={async e => {
                            e.preventDefault();

                            const response = await signup({
                                variables: {username, password, email}
                            });
                            const { ok, errors } = response.data.signup;

                            if (ok) {
                                this.props.history.push('/');
                            } else {
                                const err = {};
                                errors.forEach(({ path, message }) => {
                                    // err['passwordError'] = 'too long..';
                                    err[`${path}Error`] = message;
                                });

                                this.setState(err);
                            }

                            console.log(response);
                        }}>

                            <Form.Field error={!!emailError}>
                                <i className="material-icons prefix">email</i>
                                <Input
                                    autoFocus
                                    fluid
                                    placeholder="email"
                                    value={this.state.email}
                                    type="text"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Form.Field>

                            <Form.Field error={!!usernameError}>
                                <i className="material-icons prefix">account_circle</i>
                                <Input
                                    placeholder="username"
                                    value={this.state.username}
                                    type="text"
                                    onChange={e => this.setState({ username: e.target.value })}
                                    fluid
                                />
                            </Form.Field>

                            <Form.Field error={!!passwordError}>
                                <i className="material-icons prefix">lock</i>
                                <Input
                                    placeholder="password"
                                    value={this.state.password}
                                    type="text"
                                    onChange={e => this.setState({ password: e.target.value })}
                                    fluid
                                />
                            </Form.Field>
                            <Button floated='right' type="submit"><i className="material-icons left">whatshot</i>Signup</Button>
                        </Form>
                    {errorList.length ? (
                        <Message error header="There was some errors with your submission" list={errorList} />
                    ) : null}
                    <div><Link to='/login' >already have an account?</Link></div>
                </Container>
            )
        }}
    </Mutation>
        );
    };
}

export default SignUpForm;
