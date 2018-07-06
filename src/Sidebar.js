import React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// css
import './Sidebar.css'


export default class Sidebar extends React.Component {

    updateHash = highlight => {
        window.location.hash = `highlight-${highlight.id}`;
    };

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
                        </blockquote>
                    ) : null}
                    {/* {highlight.content.image ? (
                        <div
                            className="highlight__image"
                            style={{ marginTop: "0.5rem" }}
                        >
                            <img src={highlight.content.image} alt={"Screenshot"} />
                        </div>
                    ) : null} */}
                </div>
            </Paper>
        ))
        return(
            <div>
                <Button variant="contained" color="secondary" className='button--cs'>
                    Upload
                </Button>
                <ul className='sidebar--container'>
                    { highlitedItem }
                </ul>
            </div>
        )
    }
}