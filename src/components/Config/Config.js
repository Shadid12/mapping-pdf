import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Matcher from '../../Matcher';

//css
import './Config.css';

class Config extends Component {
    render(){
        return(
            <div className='main-config-container'>
                <div className='step-container'>
                    <div className='btn-container'>
                        <Button variant="contained" color="primary" className='btn'>
                            Previous
                        </Button>
                    </div>
                    <div className='btn-container'>
                        <Button variant="contained" color="primary" className='btn'>
                            Next
                        </Button>
                    </div>
                </div>
                <div className='matcher-containe'>
                    <Matcher />
                </div>
            </div>
        )
    }
}

export default withRouter(Config);