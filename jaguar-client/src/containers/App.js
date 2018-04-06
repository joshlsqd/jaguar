import React, {Component} from 'react';
import { ApolloProvider} from "react-apollo";
import ApolloClient from 'apollo-boost';
// import {BrowserRouter as Router} from 'react-router-dom';
import UserList from '../components/UserList';

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql"
});

class App extends Component {
    render(){
        return(
            <ApolloProvider client={client}>
                <UserList/>
            </ApolloProvider>
        )
    }
}

export default App;
