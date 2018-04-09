import React, {Component} from 'react';
import { ApolloProvider} from "react-apollo";
import ApolloClient from 'apollo-boost';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from '../containers/Navbar';
import SignupForm from '../components/SignupForm';

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql"
});

class App extends Component {
    render(){
        return(
            <ApolloProvider client={client}>
                <Router>
                <div>
                <Navbar/>
                <SignupForm/>
                </div>
                </Router>
            </ApolloProvider>
        )
    }
}

export default App;
