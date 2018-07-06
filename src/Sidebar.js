import React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

// css
import './Sidebar.css'


export default class Sidebar extends React.Component {

    updateHash = highlight => {
        window.location.hash = `highlight-${highlight.id}`;
    };

    deleteHighlight = id => {
        this.props.deleteHighlight(id);
    }

    render() {
        const highlitedItem = this.props.highlights.map(( highlight, index ) => (
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
                            {`${highlight.content.text.slice(0, 90).trim()}`}
                            <IconButton aria-label="Delete">
                                <DeleteIcon 
                                    onClick={() => {
                                        this.props.deleteHighlight(highlight.id);
                                    }}
                                />
                            </IconButton>
                        </blockquote>
                    ) : null}
                </div>
            </Paper>
        ))
        return(
            <div>
                <IconButton aria-label="Delete">
                    <DeleteIcon 
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