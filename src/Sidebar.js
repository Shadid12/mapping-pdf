import React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import LoopIcon from '@material-ui/icons/Loop';

// css
import './Sidebar.css'

// dummy data
import testHighlights from "./testHighlights";


export default class Sidebar extends React.Component {

    updateHash = highlight => {
        window.location.hash = `highlight-${highlight.id}`;
    };

    deleteHighlight = id => {
        this.props.deleteHighlight(id);
    }

    render() {
        const highlights = testHighlights['sample'];
        const highlitedItem = highlights.map(( highlight, index ) => (
            <Paper
                className='paper'
                key={index}
                onClick={() => {
                    this.updateHash(highlight);
                }}
            >
                <div>
                    {highlight.content.text ? (
                        <blockquote style={{ marginTop: "0.5rem" }}>
                            {highlight.comment.text}
                            <div>
                                <IconButton 
                                    aria-label="Delete"
                                    style={{ fontSize: 8 }}
                                >
                                    <DeleteIcon 
                                        onClick={() => {
                                            this.props.deleteHighlight(highlight.id);
                                        }}
                                    />
                                </IconButton>
                                <IconButton>
                                    <DoneIcon
                                        onClick={() => {
                                            this.props.addHighlight(highlight.id);
                                        }}
                                    />
                                </IconButton>
                            </div>
                        </blockquote>
                    ) : null}
                </div>
            </Paper>
        ))
        return(
            <div>
                <IconButton aria-label="Delete">
                    <LoopIcon 
                        onClick={() => {
                            this.props.resetHighlights();
                        }}
                    />
                </IconButton>
                <ul className='sidebar--container'>
                    { highlitedItem }
                </ul>
            </div>
        )
    }
}