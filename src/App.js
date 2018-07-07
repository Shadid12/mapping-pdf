import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Matcher from './Matcher';
import Login from './components/Login';

export default class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Matcher} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router>
        )
    }
}