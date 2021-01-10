import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

// Custom Components
import ButtonAppBar from '../Components/ButtonAppBar'
import TimeTable from '../Components/TimeTable/TimeTable'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <ButtonAppBar isWelcome={false} is_edit_view={false}/>
                <TimeTable is_edit_view={false}/>
            </React.Fragment>
        )
    }

}

export default Home;