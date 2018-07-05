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
const url = searchParams.get("url") || DEFAULT_URL;
const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

class App extends Component {
  state = {
    highlights: testHighlights[DEFAULT_URL] ? [...testHighlights[DEFAULT_URL]] : []
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  };

  scrollViewerTo = (highlight) => {};

  getHighlightById(id) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  resetHash() {
    window.location.hash = "";
  }


  updateHighlight(highlightId, position, content) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
              ...h,
              position: { ...h.position, ...position },
              content: { ...h.content, ...content }
            }
          : h;
      })
    });
  }
  
  getNextId = () => String(Math.random()).slice(2);

  addHighlight(highlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: this.getNextId() }, ...highlights]
    });
  }

  render() {
    const { highlights } = this.state;

    const HighlightPopup = ({ comment }) =>
      comment.text ? (
        <div className="Highlight__popup">
          {comment.emoji} {comment.text}
        </div>
    ) : null;

    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
        />
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          { pdfDocument => (
              <PdfAnnotator 
                pdfDocument ={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={this.resetHash}
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                url={url}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={comment => {
                      this.addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )
                }


                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={boundingRect => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  )

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );

                }}
                highlights={highlights}
              />
            )
          }
        </PdfLoader>
      </div>
    );
  }
}

export default App;
