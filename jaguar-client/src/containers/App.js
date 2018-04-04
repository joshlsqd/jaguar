import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import TaskList from '../components/TaskList';
import { ApolloProvider} from "react-apollo";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
            <TaskList/>
        </div>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
