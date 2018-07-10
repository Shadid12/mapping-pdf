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

import {
    BarChart, 
    Bar, 
    ReferenceLine, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend

} from 'recharts';

// css
import './Profile.css';
import logo from './logo.png';

// Components
import TopBar from './TopBar/TopBar';
import Loader from '../Loader/Loader';
import DashLineChart from '../DashLineChart/DashLineChart'


const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: -3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: -2000, pv: -9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: -1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: -3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


class Profile extends Component {
    state = { open: true, loading: true };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    componentDidMount() {
        setTimeout(()=> {
            this.setState({ loading: false })
        }, 1000)
    }

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
                                <ListItemText inset primary="Submission Mapping" />
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Policy Checker" />
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Quotes Analyzer" />
                            </ListItem>
                            <Divider />

                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                <ListItem button >
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset primary="Extractor" />
                                </ListItem>
                                </List>
                            </Collapse>
                            <Divider />

                        </List>
                    </div>
                </div>
                <div className='main-content-area'>
                    <TopBar />
                    {
                        this.state.loading ? (
                            <Loader />
                        ) : (
                            <div>
                                <div className='chart-container'>
                                    <DashLineChart />
                                </div>
                                <div className='achart-container'>
                                <BarChart width={600} height={300} data={data}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend />
                                    <ReferenceLine y={0} stroke='#000'/>
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);