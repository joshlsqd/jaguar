import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Loadable from 'react-loadable';


const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        decode(token);
        const { exp } = decode(refreshToken);
        if (Date.now() / 1000 > exp) {
            return false;
        }
    } catch (err) {
        return false;
    }

    return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            ))
        }
    />
);

const Loading = () => <div>...loading</div>;

const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
    loading: Loading,
});
const AsyncSignUp = Loadable({
    loader: () => import('./authorization/SignUpForm'),
    loading: Loading,
});
const AsyncLogin = Loadable({
    loader: () => import('./authorization/AuthForm'),
    loading: Loading,
});
const AsyncViewUsers = Loadable({
    loader: () => import('./authorization/UserList'),
    loading: Loading,
});
const AsyncView = Loadable({
    loader: () => import('./UserView'),
    loading: Loading,
});
const AsyncCreateOrg = Loadable({
    loader: () => import('./org_team/OrgForm'),
    loading: Loading,
});



class App extends Component {
    render(){
        return(
            <Router>
                <div>
                <Switch>
                    <Route path="/" exact component={AsyncHome} />
                    <Route path="/signup" exact component={AsyncSignUp} />
                    <Route path="/login" exact component={AsyncLogin} />
                    <PrivateRoute path="/view-users" exact component={AsyncViewUsers} />
                    <PrivateRoute path="/view" exact component={AsyncView} />
                    <PrivateRoute path="/create-org" exact component={AsyncCreateOrg} />
                </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
