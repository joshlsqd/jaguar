import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// import {RaisedButton} from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';


const ADD_TODO = gql`
 mutation addTodo($type: String!) {
   addTodo(type: $type) {
     id
     type
   }
 }
`;

const GET_TODOS  =  gql`
   query ReadTodo {
     todo(id: 5) {
       id
       text
       completed
     }
   }
 `;


const TaskForm = () => {
    let input;

    return (
        <Mutation
            mutation={ADD_TODO}
            update={(cache, { data: { addTodo } }) => {
                const { todos } = cache.readQuery({ query: GET_TODOS });
                cache.writeQuery({
                    query: GET_TODOS,
                    data: { todos: todos.concat([addTodo]) }
                });
            }}
        >
            {addTodo => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addTodo({ variables: { type: input.value } });
                            console.log(input.value)
                            input.value = "";
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button type="submit">Add Todo</button>
                    </form>
                </div>
            )}
        </Mutation>
    );
};

export default TaskForm;