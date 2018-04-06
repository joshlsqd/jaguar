import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';

const Main = props => {
    return(
        <div className='container'>
            <Switch>
                <Route exact path ='/' render={props => <Homepage {...props}/>} />
            </Switch>
        </div>
    )
}
