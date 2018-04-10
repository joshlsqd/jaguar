import React, {Component} from 'react';
import { ApolloProvider} from "react-apollo";
import ApolloClient, {InMemoryCache, ApolloLink,HttpLink} from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from '../containers/Navbar';
import AuthForm from '../components/AuthForm';
import TaskForm from "../components/TaskForm";

const httpLink = new HttpLink({
    uri: "http://localhost:3001/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");
    const authorizationHeader = token ? `Bearer ${token}` : null;
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
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
                            <Route path="taskform" component={TaskForm} />
                            <Route path="signup" component={AuthForm} />
                            <Route path="signup" component={AuthForm} />
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
