import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Matcher from './Matcher';
import Login from './components/Login';
import JsonTreeView from './components/JsonTreeView';
import Profile from './components/Profile/Profile';
import MapLanding from './components/MapLanding/MapLanding';
import Uploader from './components/Uploader/Uploader';

//css
import './style/App.css';

export default class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Matcher} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path='/tree' component={JsonTreeView} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/maplanding' component={MapLanding} />
                    <Route exact path='/uploader' component={Uploader} />
                </div>
            </Router>
        )
    }
}