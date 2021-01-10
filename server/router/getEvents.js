import EventController from "../controller/eventController";
import checkIP from "../controller/validateRequest";
let eventController = new EventController();

// Input
// {
//     session_id: 'UUIDv4',
// }
// Output
// {
//     events: [
//         {session_id: '4cba6ae5-fa4c-44ec-b68d-f6124c07b835',
//          user_id: '00001',
//          nickname: 'hi',
//          start_time: Date.now(),
//          end_time: Date.now(),}, {...}, ...
//     ]
//     success: Boolean
//     msg: String
// }

export default async function getEventsCallback(req, res) {
    let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[POST] (request) getEvents from ${client_ip}`);

    let validRequest = await checkIP(client_ip);

    let response = {
        events: null,
        success: false,
        msg: '',
    };

    const req_data = JSON.parse(JSON.stringify(req.body));

    if(!('session_id' in req_data) || !req_data['session_id']) {
        response['events'] = null;
        response['success'] = false;
        response['msg'] = 'Error: "session_id" is not in request json data.';
        return res.send(response);
    }

    if(validRequest) {
        let result = await eventController.getAllEventsBySessionID(req_data['session_id']);

        response['events'] = result['events'];
        response['success'] = result['success'];
        response['msg'] = result['msg'];
    }

    return res.send(response);
};