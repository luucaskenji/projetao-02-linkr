import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login';
import Timeline from '../pages/Timeline';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/timeline'>
                    <Timeline />
                </Route>
            </Switch>
        </Router>
    );
}