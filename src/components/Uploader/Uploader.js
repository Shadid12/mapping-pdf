import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

class Uploader extends Component {
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
                        <Button 
                            variant="contained" 
                            color="secondary"
                            // onClick={this.downloadTree}
                            onClick={() => this.props.history.push('/maplanding')}
                        >
                            Previous
                        </Button>
                        </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(Uploader);