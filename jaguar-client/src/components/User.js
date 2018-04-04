import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const User = () => (
    <Query query={gql`
        {
          user(_id: "5ac097256717cb0e6c0d893a") {
            _id
            username
            tasks {
              _id
              tasktitle
              taskdescription
            }
          }
        }
    `}>
        { ({ loading, error, data }) => {
            console.log(data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return <div><h2>{data.user.username}</h2>
                <ul>
                    {data.user.tasks.map(({tasktitle, _id}) => (
                        <li key={_id}>{tasktitle}</li>
                        ))};
                </ul>
                </div>;
        }
        }
    </Query>
);


export default User;