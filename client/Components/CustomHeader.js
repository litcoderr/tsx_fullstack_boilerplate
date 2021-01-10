import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

  
class CustomHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text
        }
   }

    render(){
        return (
            <div>
                <Typography variant="h2" gutterBottom>
                   {this.state.text}
                </Typography>
            </div>
    )
    }
}

export default CustomHeader;
