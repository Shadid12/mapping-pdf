import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Matcher from './Matcher';
import Login from './components/Login';
import JsonTreeView from './components/JsonTreeView';
import Config from './components/Config/Config';

export default class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Config} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path='/tree' component={JsonTreeView} />
                </div>
            </Router>
        )
    }
}