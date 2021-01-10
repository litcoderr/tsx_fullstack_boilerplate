import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TimeTableCell from './TimeTableCell'
import './TimeTable.css'
import ScheduleController, {startTimeToMin, endTimeToMin} from "../../utils/scheduleController";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {mapDispatchtoProps, mapStatetoProps} from "../../redux/functionMap";
import {api_url} from "../../App";

class TimeTable extends React.Component {
    weekName = [" ", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekNameLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    timeName = [];
    function_id;

    constructor(props) {
        super(props);
        if(this.props.is_edit_view){
            let user_id = "00002";  //TODO fetch user_id
            this.view_mode = "user";
            this.controller = new ScheduleController(user_id);
        }else{
            this.view_mode = "total";
            this.controller = new ScheduleController();
        }
        let today = new Date();
        let day = today.getDay();
        let start_date = new Date(today.setDate(today.getDate() - day));
        this.state = this.initState(start_date, 9 * 60, 21 * 60);
    }

    initState(start_date, start_time, end_time) {
        let state = {
            start_date : start_date,
            start_time : start_time,
            end_time : end_time,
            schedule: {
                Sunday: [],
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: []
            }
        };
        let height = (Math.floor(state.end_time - state.start_time) / 30) + 1;
        Object.keys(state.schedule).forEach((key)=> {
            // Initialize
            for (let j = 0; j < 49; j++) {
                state.schedule[key].push(0);
            }
        });
        this.initGraph(height, state);
        return state;
    };

    initGraph(height, newState){
        this.timeName = [];
        for (var i = 0; i < height; i++) {
            let time_in_min = newState.start_time + 30 * i;
            let hour = Math.floor(time_in_min / 60);
            let min = time_in_min % 60;
            this.timeName.push(hour.toString().padStart(2, '0') + ":" + min.toString().padStart(2, '0'));
        }
    }

    componentDidMount() {
        this.query = queryString.parse(this.props.location.search);
        if(this.props.is_edit_view){
            this.fetch_and_update();
        }else{
            let fetch_func_id = setInterval(()=>{
                return this.fetch_and_update();
            }, 500);
            this.function_id = fetch_func_id;
        }
        this.props.history.listen(()=>{
            if(!this.props.is_edit_view){
                clearInterval(this.function_id)
            }
        });
    }

    componentWillUnmount() {
        if(!this.props.is_edit_view){
            clearInterval(this.function_id)
        }
    }

    async fetch_and_update(){
        const response = await fetch(api_url.getEvents, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session_id: this.query.session_id
            })
        }).then((res)=>{
            return res.json()
        });
        await this.updateResponse(response, this.view_mode);
    }

    async updateResponse(res, view_mode){
        if(res.success){
            let response = this.controller.renderRawResponse(res);
            await this.controller.updateResponse(response);
            let newState = this.controller.getSchedule(view_mode, this.state.start_date);  //set total
            if(newState.start_time==1439&&newState.end_time==0){ // no events
                newState = this.initState(this.state.start_date, this.state.start_time, this.state.end_time);
            }else{
                let mergedSchedule = {
                    Sunday: [],
                    Monday: [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                    Saturday: []
                };
                Object.keys(newState.schedule).forEach((key)=> {
                    // Initialize
                    for (let j = 0; j < 49; j++) {
                        mergedSchedule[key].push(0);
                    }
                });
                // merge
                Object.keys(newState.schedule).forEach((key)=>{
                    let node = newState.schedule[key].head;
                    while(node!=null){
                        let start_time = startTimeToMin(node.data);
                        let end_time = endTimeToMin(node.data);
                        let index = {
                            start_index: Math.floor(start_time / 30),
                            end_index: Math.floor(end_time / 30)
                        };
                        for(let i=index.start_index;i<(index.end_index+1);i++){
                            mergedSchedule[key][i] += 1;
                        }
                        node = node.next;
                    }
                });
                newState.schedule = mergedSchedule;
                if(this.props.is_edit_view){
                    newState.start_time = 9 * 60;
                    newState.end_time = 21 * 60;
                }
                let height = Math.floor((newState.end_time - newState.start_time) / 30) + 1;
                this.initGraph(height, newState);
            }
            this.setState(newState);
        }else{
            console.log('Response Unsuccessful');
        }
    }

    prevWeek = () => {
        let new_date = new Date(this.state.start_date);
        new_date.setDate(this.state.start_date.getDate() - 7);
        this.setState({
            start_date : new_date,
            start_time : this.state.start_time,
            end_time : this.state.end_time,
            schedule : this.state.schedule
        });
        this.fetch_and_update()
    };

    nextWeek = () => {
        let new_date = new Date(this.state.start_date);
        new_date.setDate(this.state.start_date.getDate() + 7);
        this.setState({
            start_date : new_date,
            start_time : this.state.start_time,
            end_time : this.state.end_time,
            schedule : this.state.schedule
        });
        this.fetch_and_update()
    };

    render() {
        // Map the weekName to <td>
        let weekNametd = this.weekName.map((day, i) => {
            let temp_date = new Date(this.state.start_date);
            temp_date.setDate(temp_date.getDate()+i-1);
            if(i==0) {
                return (<td key={day} className="week-name">{day}</td>)
            }
            return (
                <td key={day} className="week-name">{temp_date.getDate()}일({day})</td>
            )
        });

        let tableData = [];
        for(let h = Math.floor(this.state.start_time/30); h <= Math.floor(this.state.end_time/30); h++) {
            for(let w = 0; w < 7; w++) {
                tableData.push(<TimeTableCell key={h*100+w} dataid={this.state.schedule[this.weekNameLong[w]][h]}/>);
            }
        }

        let totalSlots = [...tableData];
        let rows = [];
        let cells = [];

        for(var i = 0, len = totalSlots.length; i < len; i++) {
            var row = totalSlots[i];
            if((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(<td key={"k"+i.toString()} className="time-name">{this.timeName[i/7]}</td>);
                cells.push(row);
            }
            if(i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        }

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*-1}>
                    {d}
                </tr>
            )
        });

        return (
            <div className="timetable-container">
                <div className="timetable-weekcontroller">
                    <Typography variant="h4" gutterBottom>
                        <IconButton onClick={this.prevWeek} edge="start" className="prev-button" color="inherit" aria-label="prev">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <b>{this.state.start_date.getFullYear()}년 {this.state.start_date.getMonth()+1}월&nbsp;&nbsp;</b>
                        <IconButton onClick={this.nextWeek} edge="start" className="next-button" color="inherit" aria-label="next">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Typography>
                </div>
                <table className="timetable">
                    <thead key="thead">
                        <tr className="timetable-header">
                            {weekNametd}
                        </tr>
                    </thead>
                    <tbody key="tbody">
                        {trElems}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(TimeTable));
export {TimeTable};