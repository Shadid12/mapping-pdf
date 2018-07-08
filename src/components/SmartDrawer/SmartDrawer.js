import React from "react";
import Drawer from '@material-ui/core/Drawer';

export default class SmartDrawer extends React.Component {
    render(){
        return(
            <Drawer open={true} >
                <div
                    tabIndex={0}
                    role="button"
                >
                    <div>My Life is Meaning less</div>
                </div>
            </Drawer>
        )
    }
}