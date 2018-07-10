import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// components
import Matcher from './Matcher';
import Login from './components/Login';
import JsonTreeView from './components/JsonTreeView';

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
                </div>
            </Router>
        )
    }
}