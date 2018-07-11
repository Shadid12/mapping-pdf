import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { withRouter } from 'react-router-dom';


//css
import './Login.css'

class Login extends React.Component {
    render() {
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={16}
                        alignItems='center'
                        direction='column'
                        justify='space-around'
                    >
                        <Grid item xs={12} sm={12}></Grid>
                        <Paper >
                            <Tabs
                                value="Some Value"
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange}
                                >
                                <Tab label="Login" />
                                <Tab label="Signup" />
                            </Tabs>
                            <div className='text-area-container'>
                                <div className='txt-area'>
                                    <AccountCircleIcon className='login-icons' />
                                    <TextField
                                        label="Username"
                                    />
                                </div>
                                <div className='txt-area'>
                                    <LockIcon className='login-icons' />
                                    <TextField
                                        label="Password"
                                        type="password"
                                    />
                                </div>
                                <div className='btn-area'>
                                    <Button variant="contained" 
                                            color="primary"
                                            onClick={() => this.props.history.push('/profile')} 
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                        <Grid item xs={12} sm={12}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Login);