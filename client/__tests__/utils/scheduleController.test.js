import ScheduleController, {ScheduleEvent, mock_events, mock_server_response} from '../../utils/scheduleController'

describe('Schedule Event Module Test', ()=>{
	it('equal_func test', ()=>{
		expect(mock_events[0].equal_func(mock_events[0], mock_events[0])).toBe(true);
	})
});

describe('Schedule Controller Test', ()=>{
	it('updateResponse success test', async ()=>{
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);

		expect(success).toBe(true);
		// check registered schedule
		expect(controller.schedule.length).toBe(4);
		//check registered userSchedule
		expect(controller.userSchedule.length).toBe(3)
	});
	it('updateResponse not-success test', async ()=>{
		let fail_mock_server_response = mock_server_response;
		fail_mock_server_response.success = false;
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(fail_mock_server_response);

		expect(success).toBe(false);
		// check registered schedule
		expect(controller.schedule.length).toBe(0);
		//check registered userSchedule
		expect(controller.userSchedule.length).toBe(0);

		//reset for furthur tests
		mock_server_response.success = true
	});
	it('updateUserSchedule valid-data insert test', async ()=> {
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);
		
		// Non Existing and Non Overlapping user event
		// valid to insert
		let nonExisting_userEvent = new ScheduleEvent({
			_id: 0,
			session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
			user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
			nickname: 'Sunghwan',
			start_time: new Date('March 5, 2020 12:30:00'),
			end_time: new Date('March 5, 2020 13:00:00')
		});
		let result = await controller.updateUserSchedule(nonExisting_userEvent, 'insert');

		expect(result).toBe(true);
		expect(controller.userSchedule.length).toBe(4)
	});
	it('updateUserSchedule non-valid-data insert test', async ()=> {
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);
		
		// Overlapping user Event
		// not valid to insert
		let nonExisting_userEvent = new ScheduleEvent({
			_id: 0,
			session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
			user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
			nickname: 'Sunghwan',
			start_time: new Date('March 5, 2020 04:30:00'),
			end_time: new Date('March 5, 2020 08:30:00')
		});
		let result = await controller.updateUserSchedule(nonExisting_userEvent, 'insert');

		expect(result).toBe(false);
		expect(controller.userSchedule.length).toBe(3)
	});
	it('updateUserSchedule valid-data delete test', async ()=> {
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);
		
		// Existing user Event
		// not valid to insert
		let Existing_userEvent = new ScheduleEvent({
			_id: 0,
			session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
			user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
			nickname: 'Sunghwan',
			start_time: new Date('March 5, 2020 04:30:00'),
			end_time: new Date('March 5, 2020 05:00:00')
		});
		let result = await controller.updateUserSchedule(Existing_userEvent, 'delete');

		expect(result).toBe(true);
		expect(controller.userSchedule.length).toBe(2)
	});
	it('updateUserSchedule nonValid-data delete test', async ()=> {
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);
		
		// non-Existing user Event
		// not valid to insert
		let nonExisting_userEvent = new ScheduleEvent({
			_id: 0,
			session_id: '00de46db-168e-4ebd-8c7b-0c606bd08dcf',
			user_id: '729d8908-c595-4c3e-8409-80b31dd8384a',
			nickname: 'Sunghwan',
			start_time: new Date('March 5, 2020 03:30:00'),
			end_time: new Date('March 5, 2020 05:00:00')
		});
		let result = await controller.updateUserSchedule(nonExisting_userEvent, 'delete');

		expect(result).toBe(false);
		expect(controller.userSchedule.length).toBe(3)
	});
	it('getSchedule of user with startDate', async ()=>{
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);

		let startDate = new Date('March 9, 2020 04:30:00');
		let schedule = controller.getSchedule('user', startDate);
		expect(schedule.schedule.Thursday.length).toBe(1)
	});
	it('getSchedule of total with startDate', async ()=>{
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);

		let startDate = new Date('March 9, 2020 04:30:00');
		let schedule = controller.getSchedule('total', startDate);
		expect(schedule.schedule.Thursday.length).toBe(1);
		expect(schedule.schedule.Sunday.length).toBe(1)
	});
	it('getSchedule of user without startDate', async ()=>{
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);

		let schedule = controller.getSchedule('user');
		expect(schedule.length).toBe(3)
	});
	it('getSchedule of total without startDate', async ()=>{
		let controller = new ScheduleController('729d8908-c595-4c3e-8409-80b31dd8384a');
		let success = await controller.updateResponse(mock_server_response);
		expect(success).toBe(true);

		let schedule = controller.getSchedule('total');
		expect(schedule.length).toBe(4)
	})
});

