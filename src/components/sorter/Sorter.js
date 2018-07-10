import React from "react";
import SortableTree from 'react-sortable-tree';
import ReactJson from 'react-json-view';
import Grid from '@material-ui/core/Grid';
import download from 'downloadjs';
import Button from '@material-ui/core/Button';
import 'react-sortable-tree/style.css';
import './Sorter.css'

// components
import SelectBar from "../../SelectBar";

//css
import '../../style/App.css'
import { exists } from "fs";

export default class Sorter extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          treeData: this.props.tree,
        };
    }

    addItemToTree = (item) => {
        const { treeData } = this.state;
        this.setState({treeData: [item, ...treeData]})
    }

    removeItemFromTree = (item) => {
        const { treeData } = this.state;
        let newTree = treeData.filter((o) => {
            return o.id !== item.id;
        })
        this.setState({treeData: newTree});
    }

    render() {
        return(
            <div>
                <Button variant="contained">
                    Download
                </Button>
                <div style={{ display: "flex", height: "100vh" }}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <SelectBar 
                                addItemToTree={this.addItemToTree}
                                removeItemFromTree={this.removeItemFromTree}
                            />
                        </Grid>
                    </Grid>
                    <div style={{ height: 500, width: '100vw' ,display: 'inline-block', color: 'black' }}>
                        {
                            this.state.treeData.length === 0 ? (
                                <div>Click on the tabs to add Data</div>
                            ) :
                            (
                                <SortableTree
                                    treeData={this.state.treeData}
                                    onChange={treeData => this.setState({ treeData })}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}