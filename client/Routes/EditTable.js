import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

// Custom Components
import ButtonAppBar from '../Components/ButtonAppBar'
import TimeTable from '../Components/TimeTable/TimeTable'

import queryString from "query-string";
// Redux
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {mapStatetoProps, mapDispatchtoProps} from "../redux/functionMap";

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        if(!this.props.loginState.isLogged){  // redirect if not logged in
            let query = queryString.parse(this.props.location.search);
            let session_id = query.session_id;
            this.props.history.push("/timetable?session_id="+session_id);
        }
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <ButtonAppBar isWelcome={false} is_edit_view={true}/>
                <TimeTable is_edit_view={true}/>
            </React.Fragment>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(EditPage));
export {EditPage};
