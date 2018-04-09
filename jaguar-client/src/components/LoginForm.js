import React, {Component} from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_USER = gql`
mutation login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    _id
    username
    profileImageUrl
    email
  }
}
`;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: "",
        };
    }

    render() {
        return (
            <Mutation mutation={ADD_USER}>
                {(signup, {data}) => (
                    <div className='container'>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                console.log(this.state);
                                signup({
                                    variables: {
                                        password: this.state.password,
                                        email: this.state.email,
                                    }
                                });
                                this.setState({email: ""});
                                this.setState({password: ""});

                            }}
                        >
                            <input
                                placeholder="email"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <input
                                placeholder="username"
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                            <input
                                placeholder="password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                            <input
                                placeholder="profileImageUrl"
                                value={this.state.profileImageUrl}
                                onChange={e => this.setState({ profileImageUrl: e.target.value })}
                            />
                            <button type="submit">Sign Up!</button>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    };
}

export default SignupForm;
