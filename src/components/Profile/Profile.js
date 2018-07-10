import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import StarBorder from '@material-ui/icons/StarBorder';

// css
import './Profile.css';
import logo from './logo.png';


class Profile extends Component {
    state = { open: true };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        return(
            <div className='main-container'>
                <div className='main-sideNav'>
                    <div className='logo-container'>
                        <img className='logo-img' src={logo} />
                    </div>
                    {/* list items */}
                    <div className='apps-container'>
                        <List
                            component="nav"
                            subheader={<ListSubheader>Available Apps</ListSubheader>}
                        >
                            <Divider />
                            <ListItem button>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Mapper" />
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Drafts" />
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Extractor" />
                            </ListItem>
                            <Divider />

                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                <ListItem button >
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset primary="Starred" />
                                </ListItem>
                                </List>
                            </Collapse>
                            <Divider />

                        </List>
                    </div>
                </div>
                <div className='main-content-area'>
                    Main Container
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);