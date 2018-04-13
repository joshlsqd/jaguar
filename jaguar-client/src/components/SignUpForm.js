import React, {Component} from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
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
        return (
            <Mutation mutation={ADD_USER}>
            {(signup, {data, loading, error}) => {
            return (
                <div className='container'>
                    <h4>Sign Up</h4>
                    <div className="waves-effect waves-teal btn-flat">already have an account?</div>
                    <br/>
                    <div className='col s6'>
                        <form onSubmit={async e => {
                            e.preventDefault();
                            const {email, username, password} = this.state;
                            const response = await signup({
                                variables: {username, password, email}
                            });
                            const { ok, errors } = response.data.register;

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
                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <input
                                    autoFocus
                                    className="validate"
                                    placeholder="email"
                                    value={this.state.email}
                                    type="text"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </div>

                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input
                                    className="validate"
                                    placeholder="username"
                                    value={this.state.username}
                                    type="text"
                                    onChange={e => this.setState({ username: e.target.value })}
                                />
                            </div>

                            <div className="input-field col s6">
                                <i className="material-icons prefix">lock</i>
                                <input
                                    className="validate"
                                    placeholder="password"
                                    value={this.state.password}
                                    type="text"
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="waves-effect waves-light btn indigo accent-2 right"><i className="material-icons left">whatshot</i>Signup</button>
                        </form>
                    </div>
                </div>
            )
        }}
    </Mutation>
        );
    };
}

export default SignUpForm;
