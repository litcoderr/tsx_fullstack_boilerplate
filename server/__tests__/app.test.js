// test code of
// './server/app.js'

import url from 'url';
import request from 'supertest';

import app from '../app';

describe("default GET request test", ()=>{
	it("default GET should return", async ()=>{
		const result = await request(app).get('/');
		expect(result.statusCode).toBe(200);
	});
});

describe("/newSession POST request test", ()=>{
	it("/newSession POST should return valid success and url", async ()=>{
		const result = await request(app)
		.post('/newSession')
		.send({});
		
		const body = result.body;
		const unique_url = url.parse(body.url, true);
		const path = unique_url.pathname;
		const query = unique_url.query;

		expect(result.statusCode).toBe(200);
		expect(body.success).toBe(true);	
		expect(path).toBe('/timetable');
		expect(query).toHaveProperty('session_id');
	});
});

describe("/createEvents POST request test", () => {
	it("/createEvents POST should save to database", async () => {
		const result = await request(app).post('/createEvents').send({
			events: [{
				session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
				user_id: '00001',
				nickname: 'hi',
				start_time: Date.now(),
				end_time: Date.now(),}]
		});
		let response = JSON.parse(JSON.stringify(result.body));
		let success = response['success'];
		let msg = response['msg'];

		expect(success).toBe(true);
		expect(msg === undefined).toBe(false);
	})
});

describe("/createEvents POST invalid input test", () => {
	it("/createEvents POST if got invalid shape of data then" +
		"should return success=false and error msg", async () => {

		// test of data not an array
		const result = await request(app).post('/createEvents').send({
			events: {
				session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
				user_id: '00001',
				nickname: 'hi',
				start_time: Date.now(),
				end_time: Date.now(),}
		});
		let response = JSON.parse(JSON.stringify(result.body));
		let success = response['success'];
		let msg = response['msg'];

		expect(success).toBe(false);
		expect(msg.length > 0).toBe(true);
	});
});

describe("/getEvents secure password test", () => {
	it("/getEvents POST should not return password", async () => {

		// create new data with password
		let result = await request(app).post('/createEvents').send({
			events: [{
				session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
				user_id: '00099',
				nickname: 'pw_get_test',
				start_time: Date.now(),
				end_time: Date.now(),
				pw: 'abcd',}]
		});
		let response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);
		expect(response['msg']).toBe('');

		// get all data from session
		result = await request(app).post('/getEvents').send({session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835'});
		response = JSON.parse(JSON.stringify(result.body));
		expect(Array.isArray(response['events'])).toBe(true);
		expect(response['success']).toBe(true);
		expect(response['msg']).toBe('');

		let passwordSafe = true;
		for(let event of response['events']) {
			if('pw' in event) {
				passwordSafe = false;
				console.error(`Error: response data contains password`);
			}
		}
		expect(passwordSafe).toBe(true);
	})
});

describe("/getEvents POST request test", () => {
	it("/getEvents POST should return Array of event", async () => {
		const result = await request(app).post('/getEvents').send({session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835'});
		let response = JSON.parse(JSON.stringify(result.body));
		let events = response['events'];
		let success = response['success'];
		let msg = response['msg'];

		expect(Array.isArray(events)).toBe(true);
		expect(success).toBe(true);
		expect(msg === undefined).toBe(false);
	});
});

describe("/getEvents POST invalid input test", () => {
	it("/getEvents POST if got invalid shape of data then " +
		"should return success=false and error msg", async () => {

		// test the empty data
		const result = await request(app).post('/getEvents').send({});
		let response = JSON.parse(JSON.stringify(result.body));
		let events = response['events'];
		let success = response['success'];
		let msg = response['msg'];

		expect(events === null).toBe(true);
		expect(success).toBe(false);
		expect(msg.length > 0).toBe(true);
	});
});

describe("/deleteEvent POST create & delete procedure test", () => {
	it("/deleteEvent POST should successfully create items and delete items", async () => {

		// Creating test item
		let result = await request(app).post('/createEvents').send({
			events: [{
					session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
					user_id: '00100',
					nickname: 'deleteTest',
					start_time: Date.now(),
					end_time: Date.now(),
					pw: 'abc',
				}]
		});

		let response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);

		// Getting events by session id
		result = await request(app).post('/getEvents').send({session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835'});
		response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);

		// Find _id that matches deleteTest
		let event_id;
		for(let event of response['events']) {
			if(event['user_id'] === '00100') {
				event_id = event['_id'];
				break;
			}
		}
		expect(event_id === undefined).toBe(false);

		result = await request(app).post('/deleteEvent').send({_id: event_id, pw: 'abc'});
		response = JSON.parse(JSON.stringify(result.body));
		expect(response['msg']).toBe('');
		expect(response['success']).toBe(true);
	});
});

describe("/deleteEvent POST create & delete procedure test for empty password data", () => {
	it("/deleteEvent POST should successfully create items and delete items", async () => {

		// Creating test item
		let result = await request(app).post('/createEvents').send({
			events: [{
				session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
				user_id: '00101',
				nickname: 'deleteTest',
				start_time: Date.now(),
				end_time: Date.now(),
			}]
		});

		let response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);

		// Getting events by session id
		result = await request(app).post('/getEvents').send({session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835'});
		response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);

		// Find _id that matches deleteTest
		let event_id;
		for(let event of response['events']) {
			if(event['user_id'] === '00101') {
				event_id = event['_id'];
				break;
			}
		}
		expect(event_id === undefined).toBe(false);

		result = await request(app).post('/deleteEvent').send({_id: event_id, pw: ''});
		response = JSON.parse(JSON.stringify(result.body));
		expect(response['msg']).toBe('');
		expect(response['success']).toBe(true);
	});
});

describe("/deleteEvent POST create & delete procedure test for wrong password", () => {
	it("/deleteEvent POST should successfully create items and delete items", async () => {

		// Creating test item
		let result = await request(app).post('/createEvents').send({
			events: [{
				session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
				user_id: '00102',
				nickname: 'deleteTest',
				start_time: Date.now(),
				end_time: Date.now(),
				pw: 'abc',
			}]
		});

		let response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);

		// Getting events by session id
		result = await request(app).post('/getEvents').send({session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835'});
		response = JSON.parse(JSON.stringify(result.body));
		expect(response['success']).toBe(true);

		// Find _id that matches deleteTest
		let event_id;
		for(let event of response['events']) {
			if(event['user_id'] === '00102') {
				event_id = event['_id'];
				break;
			}
		}
		expect(event_id === undefined).toBe(false);

		result = await request(app).post('/deleteEvent').send({_id: event_id, pw: ''});
		response = JSON.parse(JSON.stringify(result.body));
		expect(response['msg']).toBe('Wrong password');
		expect(response['success']).toBe(false);
	});
});

describe("/deleteEvent POST create & delete procedure test for non-existing data", () => {
	it("/deleteEvent POST should successfully create items and delete items", async () => {
		let mongoose = require('mongoose');
		let result = await request(app).post('/deleteEvent').send({
			_id: 'ffffffffffffffffffffffff',  // Wrong ID
			pw: ''
		});
		let response = JSON.parse(JSON.stringify(result.body));
		expect(response['msg']).toBe('Requested item not found');
		expect(response['success']).toBe(false);
	});
});

describe("/deleteEvent POST create & delete procedure test for invalid request", () => {
	it("/deleteEvent POST should successfully create items and delete items", async () => {
		let result = await request(app).post('/deleteEvent').send({id: '', pw: ''});
		let response = JSON.parse(JSON.stringify(result.body));
		expect(response['msg']).toBe('Error: query should contain "_id" and "pw"');
		expect(response['success']).toBe(false);
	});
});

describe("/* GET request main page load test", () => {
	it("/* GET should return HTML_FILE", async () => {
		const result = await request(app).get('/').send({});

		expect(result.statusCode).toBe(200);
		expect(result.text.length > 0).toBe(true);
		expect(result.type).toBe('text/html');
	});
});