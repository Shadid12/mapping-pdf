import React from "react";
import ReactJson from 'react-json-view'
import SortableTree from 'react-sortable-tree';

//css 
import './JsonTreeView.css';
import 'react-sortable-tree/style.css';

export default class JsonTreeView extends React.Component {
    state = {
        treeData: this.props.tree
    }
    render() {
        return(
            <div className='tree-container'>
                <ReactJson src={this.state.treeData} />
            </div>
        )
    }
}