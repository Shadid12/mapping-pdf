import React from "react";
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import Grid from '@material-ui/core/Grid';
import download from 'downloadjs';
import Button from '@material-ui/core/Button';

//css
import 'react-sortable-tree/style.css';
import './Sorter.css'

// components
import SelectBar from "../../SelectBar";

//css
import '../../style/App.css'

// dummy data
import testHighlights from "../../testHighlights";



export default class Sorter extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          treeData: this.props.tree,
          treeProp: testHighlights['sample']
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

    downloadTree = () => {
        let obj = this.state.treeData;
        let template = {
          'sample': obj
        }
        let data = JSON.stringify(template);
        download(data, "tree.json", "text/plain");
    }

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        return(
            <div>
                <div className='btn-clapper'>
                    <Button 
                        variant="contained"
                        onClick={this.downloadTree}
                        disabled={!this.state.treeData.length}
                    >
                        Download
                    </Button>
                </div>
                <div style={{ display: "flex", height: "100vh" }}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <SelectBar 
                                addItemToTree={this.addItemToTree}
                                tree={this.state.treeProp}
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
                                    generateNodeProps={({ node, path }) => ({
                                        buttons: [
                                          <button
                                            onClick={() =>
                                                this.setState(state => ({
                                                treeData: removeNodeAtPath({
                                                    treeData: state.treeData,
                                                    path,
                                                    getNodeKey,
                                                }),
                                                }))
                                            }
                                          >
                                              x
                                          </button>
                                        ],
                                    })}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}