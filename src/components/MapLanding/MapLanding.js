import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

//lib
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class MapLanding extends Component {
    render() {
        return(
            <div>
                <AppBar position="sticky">
                    <Toolbar>
                    <IconButton className='' color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <IconButton 
                        className='' 
                        color="inherit" 
                        aria-label="Menu"
                        onClick={() => {
                        this.props.history.push('/login')
                        // window.location.href='/login'
                        }}
                    >
                        <AccountCircle></AccountCircle>
                    </IconButton>
                    <Typography variant="title" color="inherit" className='title'>
                        Chisel
                    </Typography>
                    </Toolbar>
                </AppBar>

                <Paper>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Document Type</TableCell>
                            <TableCell>Template Name</TableCell>
                        </TableRow>
                    </TableHead>
                    </Table>
                </Paper>
            </div>
        )
    }
}


export default withRouter(MapLanding);