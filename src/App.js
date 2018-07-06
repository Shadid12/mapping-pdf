import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//lib
import URLSearchParams from "url-search-params";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';


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
import pdfFile from './sample.pdf';

const DEFAULT_URL = pdfFile;
const searchParams = new URLSearchParams(window.location.search);
const url = searchParams.get("url") || DEFAULT_URL;
const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



class App extends Component {
  state = {
    highlights: testHighlights['sample'] ? [...testHighlights['sample']] : []
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
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton className='' color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <IconButton className='' color="inherit" aria-label="Menu">
              <AccountCircle></AccountCircle>
            </IconButton>
            <Typography variant="title" color="inherit" className=''>
              Chisel
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Grid container>
          <Grid item xs={6} sm={3}>
              <Sidebar
                highlights={highlights}
                resetHighlights={this.resetHighlights}
              />
          </Grid>
          <Grid item xs={12} sm={6} className='show'>
            <div
              style={{
                height: "100vh",
                width: "70vw",
                overflowY: "scroll",
                position: "relative"
              }}
            >
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
          </Grid>
        </Grid>
        {/* <PdfLoader url={url} beforeLoad={<Spinner />}>
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
        </PdfLoader> */}
      </div>
      </div>
    );
  }
}

export default App;
