import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login';
import Timeline from '../pages/Timeline';
import Hashtag from '../pages/Hashtag';

import UserDataProvider from '../contexts/UserData';
import PostsProvider from '../contexts/PostsContext';

export default function App() {
    return (
        <UserDataProvider>
            <PostsProvider>
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
                    </Switch>
                </Router>
            </PostsProvider>
        </UserDataProvider>
    );
}