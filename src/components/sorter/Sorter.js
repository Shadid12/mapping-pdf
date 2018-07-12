import React from "react";
import SortableTree, { removeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree';
import download from 'downloadjs';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';


//css
import 'react-sortable-tree/style.css';
import './Sorter.css'

// components
import SelectBar from "../../SelectBar";

//css
import '../../style/App.css'

// dummy data
import testHighlights from "../../testHighlights";
import sampleData from './sample';



export default class Sorter extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
        //   treeData: this.props.tree,
          treeData: sampleData,
          treeProp: testHighlights['sample'],
          showCreateNode: false,
          newNodeTitle: '',
          path: sampleData.length
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

    getNodeNew = (title) => {
        return {
            'title': title,
            'content': 'I am content',
            'children': []
        }
    }

    createNode = () => {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        this.setState(state => ({
                        showCreateNode: false,
                        treeData: addNodeUnderParent({
                            treeData: state.treeData,
                            parentKey: this.state.path[this.state.path.length - 1],
                            expandParent: true,
                            getNodeKey,
                            newNode: this.getNodeNew(this.state.newNodeTitle),
                        }).treeData,
        }))
    }

    handleCreateNodeInput = (e) => {
        this.setState({newNodeTitle: e.target.value});
    }

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        return(
            <div>
                <Dialog
                    open={this.state.showCreateNode}
                    onClose={() => {this.setState({ showCreateNode: false })}}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Create New Node</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a New Node
                    </DialogContentText>
                    <TextField
                        label="Title"
                        autoFocus
                        margin="dense"
                        fullWidth
                        onChange={this.handleCreateNodeInput}
                    />
                    <DialogActions>
                        <Button onClick={this.createNode} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </DialogContent>
                </Dialog>
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
                    {/* <Grid container>
                        <Grid item xs={12} sm={6}>
                            <SelectBar 
                                addItemToTree={this.addItemToTree}
                                tree={this.state.treeProp}
                                removeItemFromTree={this.removeItemFromTree}
                            />
                        </Grid>
                    </Grid> */}
                    <div style={{ height: '100vh', width: '100vw' ,display: 'inline-block', color: 'black' }}>
                        {
                            this.state.treeData.length === 0 ? (
                                <div>Click on the tabs to add Data</div>
                            ) :
                            (
                                <SortableTree
                                    treeData={this.state.treeData}
                                    expanded={true}
                                    onChange={treeData => this.setState({ treeData })}
                                    generateNodeProps={({ node, path }) => ({
                                        buttons: [
                                         <Button
                                            variant="outlined"
                                            color='primary'
                                            classes='add-button'
                                            onClick={() => {
                                                console.log(getNodeKey)
                                                this.setState({
                                                    showCreateNode: true, 
                                                    path: path, 
                                                    getNodeKey: getNodeKey
                                                })
                                                // let newNodeTitle = window.prompt('Enter Node Title');
                                                // if (newNodeTitle) {
                                                //     this.setState(state => ({
                                                //         treeData: addNodeUnderParent({
                                                //             treeData: state.treeData,
                                                //             parentKey: path[path.length - 1],
                                                //             expandParent: true,
                                                //             getNodeKey,
                                                //             newNode: this.getNodeNew(newNodeTitle),
                                                //         }).treeData,
                                                //     }))
                                                // }
                                            }
                                            }
                                            >
                                            +
                                          </Button>,
                                          <Button
                                            variant="outlined"
                                            color='secondary'
                                            onClick={() => {
                                                this.setState(state => ({
                                                    treeData: removeNodeAtPath({
                                                        treeData: state.treeData,
                                                        path,
                                                        getNodeKey,
                                                    }),
                                                    }))
                                            }
                                            }
                                          >
                                            -
                                          </Button>
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