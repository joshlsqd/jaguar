import React, {Component} from 'react';
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";
import { AUTH_TOKEN } from '../constants'

const LOGIN_USER = gql`
    mutation login( $password: String!, $email: String!) {
        login(email: $email, password: $password) {
        token
        }
    }`;

const updateCache = (cache, {data}) => {
    console.log(data, cache);
};

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            username: "",
            password: "",
            email: "",
            profileImageUrl: ""
        };
    }

    render() {
        const {email, password } = this.state;
        return (
            <Mutation mutation={LOGIN_USER} updateCache={updateCache}>
                {(login, {data}) => (
                    <div className='container'>
                        <h4>Login</h4>
                        <Link to="/signup" className="waves-effect waves-teal btn-flat"> need to create an account?</Link>
                        <br/>
                        <div className='col s6'>
                                <form
                                    onSubmit={async e => {
                                        e.preventDefault();
                                        await login({
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
                                    <button type="submit" className="waves-effect waves-light btn indigo accent-2 right"><i className="material-icons left">whatshot</i>login</button>
                                </form>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    };

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default AuthForm;
