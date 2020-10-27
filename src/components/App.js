import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './Login';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}