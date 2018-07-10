import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';
import Input from '@material-ui/core/Input';
// css
import './TopBar.css'

export default class TopBar extends Component {
    render() {
        return(
            <div className='maintop-containe'>
                <div className='maintop-placeHolder'>
                </div>
                <div className='maintop-iconcontainer'>
                    <AccountCircleIcon color='primary' 
                        style={{ fontSize: 26, cursor: 'pointer', display:'flex', flex: 0.25 }}
                    />
                    <QuestionAnswerIcon 
                        color='primary' 
                        style={{ fontSize: 26, cursor: 'pointer', display:'flex', flex: 0.25 }}
                    />

                    <SettingsIcon 
                        color='primary' 
                        style={{ fontSize: 26, cursor: 'pointer', display:'flex', flex: 0.25 }}
                    />

                    <ReceiptIcon 
                        color='primary' 
                        style={{ fontSize: 26, cursor: 'pointer', display:'flex', flex: 0.25 }}
                    />
                    
                </div>
            </div>
        )
    }
}