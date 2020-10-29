import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login';
import Timeline from '../pages/Timeline';
import Hashtag from '../pages/Hashtag';
import User from '../pages/User';

import UserDataProvider from '../contexts/UserData';
import PagesProvider from '../contexts/PagesContext';

export default function App() {
    return (
        <UserDataProvider>
            <PagesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact>
                            <Login />
                        </Route>
                        <Route path='/timeline'>
                            <Timeline />
                        </Route>
                        <Route path='/hashtag/:hashtag'>
                            <Hashtag />
                        </Route>  
                        <Route path='/user/:id'>
                            <User />
                        </Route>                      
                    </Switch>
                </Router>
            </PagesProvider>
        </UserDataProvider>
    );
}