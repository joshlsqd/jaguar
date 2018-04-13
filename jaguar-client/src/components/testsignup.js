import React, {Component} from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTH_TOKEN } from '../constants'

const ADD_USER = gql`
mutation signup($username: String!, $password: String!, $email: String!, $profileImageUrl: String) {
  signup(username: $username, password: $password, email: $email, profileImageUrl: $profileImageUrl) {
    token
  }
}
`;

const LOGIN_USER = gql`
    mutation login( $password: String!, $email: String!) {
        login(email: $email, password: $password) {
        token
        }
    }`;

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            username: "",
            password: "",
            email: "",
            profileImageUrl: "",
            login: true
        };
    }

    render() {
        const {email, username, password, profileImageUrl} = this.state;
        return (
            <div>
                {!this.state.login && (
                    <Mutation mutation={ADD_USER}>
                        {(signup, {data}) => (
                            <div className='container'>
                                <h4>Sign Up</h4>
                                <div
                                    className="waves-effect waves-teal btn-flat"
                                    onClick={() => this.setState({ login: !this.state.login })}
                                >
                                    {this.state.login
                                        ? 'need to create an account?'
                                        : 'already have an account?'}
                                </div>
                                <br/>
                                <div className='col s6'>
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            signup({
                                                variables: {
                                                    username: username,
                                                    password: password,
                                                    email: email,
                                                    profileImageUrl: profileImageUrl
                                                }
                                            });
                                        }}
                                    >
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">email</i>
                                            <input
                                                className="validate"
                                                placeholder="email"
                                                value={email}
                                                type="text"
                                                id="email"
                                                name="email"
                                                onChange={e => this.setState({ email: e.target.value })}
                                            />
                                        </div>

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input
                                                className="validate"
                                                placeholder="username"
                                                value={username}
                                                type="text"
                                                id="username"
                                                name="username"
                                                onChange={e => this.setState({ username: e.target.value })}
                                            />
                                        </div>

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input
                                                className="validate"
                                                placeholder="password"
                                                value={password}
                                                type="text"
                                                id="password"
                                                name="password"
                                                onChange={e => this.setState({ password: e.target.value })}
                                            />
                                        </div>

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">image</i>
                                            <input
                                                className="validate"
                                                placeholder="profileImageUrl"
                                                value={profileImageUrl}
                                                type="text"
                                                id="profileImageUrl"
                                                name="profileImageUrl"
                                                onChange={e => this.setState({ profileImageUrl: e.target.value })}
                                            />
                                        </div>
                                        <a className="waves-effect waves-light btn indigo accent-2 right"><i className="material-icons left">whatshot</i>Signup</a>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Mutation>
                )}
                {this.state.login && (
                    <Mutation mutation={LOGIN_USER}>
                        {(login, {data}) => (
                            <div className='container'>
                                <h4>Login</h4>
                                <div
                                    className="waves-effect waves-teal btn-flat"
                                    onClick={() => this.setState({ login: !this.state.login })}
                                >
                                    {this.state.login
                                        ? 'need to create an account?'
                                        : 'already have an account?'}
                                </div>
                                <br/>
                                <div className='col s6'>
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            login({
                                                variables: {
                                                    password: password,
                                                    email: email
                                                }
                                            });
                                            console.log(data);
                                            const {token} = data.signup;
                                            this._saveUserData(token);
                                        }}
                                    >

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">email</i>
                                            <input
                                                className="validate"
                                                placeholder="email"
                                                value={email}
                                                type="text"
                                                id="email"
                                                name="email"
                                                onChange={e => this.setState({ email: e.target.value })}
                                            />
                                        </div>

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input
                                                className="validate"
                                                placeholder="password"
                                                value={password}
                                                type="text"
                                                id="password"
                                                name="password"
                                                onChange={e => this.setState({ password: e.target.value })}
                                            />
                                        </div>

                                        <a className="waves-effect waves-light btn indigo accent-2 right"><i className="material-icons left">whatshot</i>login</a>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Mutation>
                )}

            </div>
        );
    };
    _confirm = async () => {
        // ... you'll implement this in a bit
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default AuthForm;
