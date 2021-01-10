import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom'
import React from 'react';

// Custom Components
import ButtonAppBar from '../Components/ButtonAppBar'
import Button from '@material-ui/core/Button';

import {api_url} from '../App'


class Welcome extends React.Component {
    constructor(props){
        super(props)
    }
    requestNewSession = async () => {
        console.log('request api: ', api_url.newSession);
        try{
            const response = await fetch(api_url.newSession, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }).then((res)=>{
                return res.json()
            });
            if(response.success){
                this.props.history.push(response.url)
            }
        }catch(error){
            console.log(error)
        }
    };

    requestEditView = async () => {
        this.props.history.push("/timetable?session_id=4cba6ae5-fa4c-44ec-b68d-f6124c07b834")
    };

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <ButtonAppBar isWelcome={true}/>
                <br/>
                <Button onClick={this.requestNewSession} variant="contained" color="primary">Create Link</Button><br/>
                <Button onClick={this.requestEditView} variant="contained" color="primary">Timetable View Test</Button><br/>
            </React.Fragment>
        )
    }
}

export default Welcome;