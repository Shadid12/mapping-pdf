import React from "react";
import SortableTree from 'react-sortable-tree';
import ReactJson from 'react-json-view'
import 'react-sortable-tree/style.css';
import './Sorter.css'


export default class Sorter extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          treeData: this.props.tree,
        };
    }
    render() {
        return(
            <div style={{ height: 500, width: 500 ,display: 'inline-block' }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                />
            </div>
        )
    }
}