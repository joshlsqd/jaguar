import React, {Component} from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_USER = gql`
mutation signup($username: String!, $password: String!, $email: String!, $profileImageUrl: String) {
  signup(username: $username, password: $password, email: $email, profileImageUrl: $profileImageUrl) {
    _id
    username
    profileImageUrl
    email
  }
}
`;

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            profileImageUrl: ""
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
                                        username: this.state.username,
                                        password: this.state.password,
                                        email: this.state.email,
                                        profileImageUrl: this.state.profileImageUrl
                                    }
                                });
                                    this.setState({username: ""});
                                    this.setState({email: ""});
                                    this.setState({password: ""});
                                    this.setState({profileImageUrl: ""});

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
