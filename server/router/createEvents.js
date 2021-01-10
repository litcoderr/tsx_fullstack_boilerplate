import EventController from "../controller/eventController";
import checkIP from "../controller/validateRequest";
let eventController = new EventController();

// Input
// {
//     events: [{session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
//         user_id: '00001',
//         nickname: 'hi',
//         start_time: Date.now(),
//         end_time: Date.now(),
//         pw: 'Hashed password'}, {...}, ...]
// }

// Output
// {
//     success: Boolean,
//     msg: "" if success / Error Message if failed,
// }

export default async function createEventsCallback(req, res) {
    let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[POST] (request) createEvents from ${client_ip}`);

    let validRequest = await checkIP(client_ip);

    let response = {
        success: false,
        msg: '',
    };

    const req_data = JSON.parse(JSON.stringify(req.body));

    if(!(req_data['events'] && Array.isArray(req_data['events']))) {
        response['success'] = false;
        response['msg'] = 'Error: assert events in req, isArray(req["events"])';
        return res.send(response);
    }

    if(validRequest) {
        let {success, msg} = await eventController.saveEvents(req_data['events']);
        response['success'] = success;
        response['msg'] = msg;
    }

    return res.send(response);
};