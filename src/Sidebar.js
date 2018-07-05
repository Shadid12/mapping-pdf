import React from "react";


export default class Sidebar extends React.Component {

    updateHash = (highlight) => {
        console.log(highlight.id);
    }

    render() {
        const highlitedItem = this.props.highlights.map(( highlight, index ) => (
            <li
                key={index}
                onClick={() => {
                    this.updateHash(highlight);
                }}
            >
                I am a A Fool
            </li>
        ))
        return(
            <div>
                <h3>Sidebar</h3>
                <ul>
                    { highlitedItem }
                </ul>
            </div>
        )
    }
}