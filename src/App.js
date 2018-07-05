import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//lib
import URLSearchParams from "url-search-params";
import {
  PdfLoader,
  PdfAnnotator,
  Tip,
  Highlight,
  Popup,
  AreaHighlight
} from "react-pdf-highlighter";

// components
import testHighlights from "./testHighlights";
import Sidebar from "./Sidebar";
import Spinner from './Spinner';

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const searchParams = new URLSearchParams(window.location.search);
const url = searchParams.get("url") || DEFAULT_URL

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
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {pdfDocument => (
            <div>pdfDocument</div>
          )}
        </PdfLoader>
      </div>
    );
  }
}

export default App;
