import React, {Component} from 'react';
import { ApolloProvider} from "react-apollo";
import ApolloClient from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from '../containers/Navbar';
import SignupForm from '../components/SignupForm';
import TaskForm from "../components/TaskForm";


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql"
});

class App extends Component {
    render(){
        return(
            <MuiThemeProvider>
            <ApolloProvider client={client}>
                <Router>
                    <Route path="taskform" component={TaskForm} />
                <div>
                <Navbar/>
                <SignupForm/>
                </div>
                </Router>
            </ApolloProvider>
            </MuiThemeProvider>
        )
    }
}

export default App;
