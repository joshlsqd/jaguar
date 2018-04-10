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

class AuthForm extends Component {
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
        const {email, username, password, profileImageUrl} = this.state;
        return (
            <Mutation mutation={ADD_USER}>
                {(signup, {data}) => (
                    <div className='container'>
                        <div className='col s6'>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                console.log(this.state);
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
        );
    };
}

export default AuthForm;
