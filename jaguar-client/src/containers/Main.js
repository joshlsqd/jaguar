import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Main = ({ data: { allUsers = [] } }) => allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

const allUsersQuery = gql`
  {
    allUsers {
      _id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Main);
