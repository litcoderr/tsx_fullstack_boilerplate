import LinkedList from './linkedlist';
import {isSameWeek} from "date-fns";

class ScheduleEvent{
	constructor(res){
		this._id = res._id;
		this.session_id = res.session_id;
		this.user_id = res.user_id;
		this.nickname = res.nickname;
		this.start_time = res.start_time;
		this.end_time = res.end_time
	}

	equal_func(e1, e2){
		return (e1._id === e2._id && e1.session_id === e2.session_id && e1.user_id === e2.user_id && e1.nickname === e2.nickname && e1.start_time.getTime() === e2.start_time.getTime() && e1.end_time.getTime() === e2.end_time.getTime())
	}
}

function startTimeToMin(event){
	let current_hours = event.start_time.getHours();
	let current_minutes = event.start_time.getMinutes();
	return current_hours * 60 + current_minutes
}

function endTimeToMin(event){
	let current_hours = event.end_time.getHours();
	let current_minutes = event.end_time.getMinutes();
	return current_hours * 60 + current_minutes
}

function startDateToMin(event){
	let start_time_in_minutes = Math.floor(event.start_time.getTime() / 60000);
	return start_time_in_minutes
}

function endDateToMin(event){
	let end_time_in_minutes = Math.floor(event.end_time.getTime() / 60000);
	return end_time_in_minutes
}

function user_schedule_compare_func(input_node, compared_node){
	// return true if input_node can come infront of compared_node
	let input_end_time = endDateToMin(input_node.data);
	let compared_start_time = startDateToMin(compared_node.data);
	return input_end_time <= compared_start_time
}

function user_validation_func(cur_node, before, next){
	// return true if cur_node is valid to push	
	let valid = true;
	if(before != null){
		if(endDateToMin(before.data) > startDateToMin(cur_node.data)){
			valid = false;	
		}
	}
	if(next != null){
		if(startDateToMin(next.data) < endDateToMin(cur_node.data)){
			valid = false;	
		}	
	}

	return valid;
}

class ScheduleController{
	constructor(user_id=''){
		this.user_id = user_id;
		
		// time in minutes
		// from 0 to 1439
		this.time_interval = 30;
		this.time_info = {
			start_time: 480,
			end_time: 1380
		};
		this.user_time_info = {
			start_time: 480,
			end_time: 1380
		};

		this.init_schedule();
		this.dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	}

	setUserId(user_id){
		this.user_id = user_id;
		this.userSchedule = new LinkedList(user_schedule_compare_func, user_validation_func)
		this.user_time_info = {
			start_time: 480,
			end_time: 1380
		};

		let head = this.schedule.head;
		while(head != null){
			let event = head.data;
			if(event.user_id == this.user_id){
				this.userSchedule.push(event);
				this.updateTimeInfo(this.user_time_info, event)
				head = head.next;
			}
		}
	}

	renderRawResponse(res){
	    let events = [];
	    res.events.map((elem)=>{
	    	let temp = new ScheduleEvent(elem);
	    	temp.start_time = new Date(temp.start_time);
	    	temp.end_time = new Date(temp.end_time);
	    	events.push(temp);
		});
		let response = {
			success: res.success,
			body: events
		};
		return response;
	}

	init_schedule(){
		// ALl user schedule
		// each key contains list of ScheduleEvent Object
		this.schedule = new LinkedList(user_schedule_compare_func);

		// current user's schedule
		// {[ScheduleEvent]}
        this.userSchedule = new LinkedList(user_schedule_compare_func, user_validation_func)
	}

	async updateResponse(res){
		/* Called when updating server response
		 * res: server response object
		 */
		let success = true;
		if(res.success){
			this.init_schedule();
			res.body.forEach((event, index)=>{
				// update this.schedule
				this.schedule.push(event);
				this.updateTimeInfo(this.time_info, event);

				// update this.userSchedule if event matches user_id
				if(event.user_id === this.user_id){
					this.userSchedule.push(event);
					this.updateTimeInfo(this.user_time_info, event)
				}
			});
		}else{
			success = false
		}
		return success
	}
	
	async updateUserSchedule(event, mode = 'insert'){
		/* Called when updating user schedule
		 * event: ScheduleEvent Object
		 * mode: string 'insert' or 'delete'
		 */
		if(mode == 'insert'){
			return this.userSchedule.push(event)
		}else if(mode == 'delete'){
			return this.userSchedule.pop(event, event.equal_func)
		}
	}

	updateTimeInfo(time_info, event){
		// Check if max
		if (endTimeToMin(event) > time_info.end_time){
			time_info.end_time = endTimeToMin(event)
		}

		// Check if min
		if (startTimeToMin(event) < time_info.start_time){
			time_info.start_time = startTimeToMin(event)
		}
	}

	getSchedule(mode, startDate = null){
	    let schedule = null;
		if(mode == 'user'){
			schedule = this.userSchedule;
		}else if(mode == 'total'){
			schedule = this.schedule;
		}

		if(startDate == null){
			return schedule;
		}else{  // start date exist
			let result = {
			    start_date: startDate,
				start_time: 1439,
				end_time: 0,
				schedule: {
					Sunday: new LinkedList(user_schedule_compare_func),
					Monday: new LinkedList(user_schedule_compare_func),
					Tuesday: new LinkedList(user_schedule_compare_func),
					Wednesday: new LinkedList(user_schedule_compare_func),
					Thursday: new LinkedList(user_schedule_compare_func),
					Friday: new LinkedList(user_schedule_compare_func),
					Saturday: new LinkedList(user_schedule_compare_func)
				}
			};
			let head = schedule.head;
			let start = false;
			while(head!=null){
				if(isSameWeek(head.data.start_time, startDate)) {
					if (!start) {
						start = true;
					}
					let day = this.dayIndex[head.data.start_time.getDay()];
					result.schedule[day].push(head.data);
					if (startTimeToMin(head.data) < result.start_time){
						result.start_time = startTimeToMin(head.data);
					}
					if (endTimeToMin(head.data) > result.end_time){
						result.end_time = endTimeToMin(head.data);
					}
				}else{
					if(start){ // end of insert
						break;
					}
				}
				head = head.next;
			}
			return result;
		}
	}
}

// mock data for testing
const mock_events = [
	new ScheduleEvent({
		_id: 0,
		session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
		user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
		nickname: 'Sunghwan',
		start_time: new Date('March 5, 2020 04:30:00'),
		end_time: new Date('March 5, 2020 05:00:00')
	}),
	new ScheduleEvent({
		_id: 1,
		session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
		user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
		nickname: 'Sunghwan',
		start_time: new Date('March 5, 2020 02:30:00'),
		end_time: new Date('March 5, 2020 03:30:00')
	}),
	new ScheduleEvent({
		_id: 3,
		session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
		user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
		nickname: 'Sunghwan',
		start_time: new Date('March 12, 2020 02:30:00'),
		end_time: new Date('March 12, 2020 03:30:00')
	}),
	new ScheduleEvent({
		_id: 2,
		session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
		user_id: '729d8908-b787-4c3e-8409-90b31333384a',
		nickname: 'Youngchae',
		start_time: new Date('March 8, 2020 01:30:00'),
		end_time: new Date('March 8, 2020 02:30:00')
	})
];
// mock server response
// TODO Change based on real server response
const mock_server_response = {
	success: true,
	body: mock_events
};

export default ScheduleController;
export {mock_server_response, mock_events, ScheduleEvent, startTimeToMin, endTimeToMin};
