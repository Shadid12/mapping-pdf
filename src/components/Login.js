import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

//css
import './Login.css'

export default class Login extends React.Component {
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
                                    <TextField
                                        label="Username"
                                    />
                                </div>
                                <div className='txt-area'>
                                    <TextField
                                        label="Password"
                                        type="password"
                                    />
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