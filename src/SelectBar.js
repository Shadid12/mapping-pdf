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


export default class SelectBar extends React.Component {
    state = {
        treeData: testHighlights['sample'],
        removeableItems: []
    }

    render() {
        const {removeableItems} = this.state;
        const highlights = this.props.tree;
        const highlitedItem = highlights.map(( highlight, index ) => (
            <Paper
                className='paper'
                key={index}
                onClick={() => {
                    this.props.addItemToTree(highlight);
                }}
            >
                <div>
                    {highlight.content.text ? (
                        <div style={{ marginTop: "0.5rem", color: 'black', cursor: 'pointer' }}>
                            {highlight.comment.text}
                        </div>
                    ) : null}
                </div>
            </Paper>
        ));

        const removeables = this.state.removeableItems.map((item, index) => (
            <Paper
                className='paper'
                key={index}
            >
                <div>
                    {item.content.text ? (
                        <div style={{ marginTop: "0.5rem", color: 'red', cursor: 'pointer' }}>
                            {item.comment.text}
                        </div>
                    ) : null}
                </div>
            </Paper>
        ))

        return(
            <div>
                <ul className='sidebar--container'>
                    { highlitedItem }
                    {/* { removeables } */}
                </ul>
            </div>
        )
    }
}