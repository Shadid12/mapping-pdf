import React from "react";


export default class Sidebar extends React.Component {

    updateHash = highlight => {
        window.location.hash = `highlight-${highlight.id}`;
    };

    render() {
        const highlitedItem = this.props.highlights.map(( highlight, index ) => (
            <li
                key={index}
                onClick={() => {
                    this.updateHash(highlight);
                }}
            >
                <div>
                    {highlight.content.text ? (
                        <blockquote style={{ marginTop: "0.5rem" }}>
                            {`${highlight.content.text.slice(0, 90).trim()}…`}
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
            </li>
        ))
        return(
            <div style={{'maxWidth': '200px'}}>
                <h3>Sidebar</h3>
                <ul>
                    { highlitedItem }
                </ul>
            </div>
        )
    }
}