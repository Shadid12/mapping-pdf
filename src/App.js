import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//lib
import URLSearchParams from "url-search-params";

// components
import testHighlights from "./testHighlights";
import Sidebar from "./Sidebar";

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

class App extends Component {
  state = {
    highlights: testHighlights[DEFAULT_URL] ? [...testHighlights[DEFAULT_URL]] : []
  };

  render() {
    const { highlights } = this.state;
    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
        />
      </div>
    );
  }
}

export default App;
