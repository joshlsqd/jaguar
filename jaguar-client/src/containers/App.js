import React, {Component} from 'react';
import { ApolloProvider} from "react-apollo";
import ApolloClient, {InMemoryCache, ApolloLink,HttpLink} from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { defaults } from '../resolvers'
import { AUTH_TOKEN } from '../constants'
import Navbar from '../containers/Navbar';
import AuthForm from '../components/AuthForm';
import SignUpForm from '../components/SignUpForm';
import TaskForm from "../components/TaskForm";
import UserList from "../components/UserList";


const httpLink = new HttpLink({
    uri: "http://localhost:3001/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authorizationHeader = token ? `Bearer ${token}` : null;
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    });
    return forward(operation);
});

const httpLinkWithAuthToken = authLink.concat(httpLink);

const client = new ApolloClient({
    // link: httpLinkWithAuthToken,
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
    clientState: {
        defaults
    }
});

class App extends Component {
    render(){
        return(
            <MuiThemeProvider>
            <ApolloProvider client={client}>
                <Router>
                <div>
                    <Navbar/>
                    <div>
                        <Switch>
                            <Route path="/taskform" component={TaskForm} />
                            <Route path="/tasklist" component={UserList} />
                            <Route path="/login" component={AuthForm} />
                            <Route path="/signup" component={SignUpForm} />
                        </Switch>
                    </div>
                </div>
                </Router>
            </ApolloProvider>
            </MuiThemeProvider>
        )
    }
}

export default App;
