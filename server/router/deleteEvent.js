import EventController from "../controller/eventController";
import checkIP from "../controller/validateRequest";
let eventController = new EventController();

// Delete items filter by "_id"s using password "pw".
// You can get '_id' by response['events'][0]['_id']
// This is NOT user_id. Just database object _id.

// Delete empty password by pw = ''

// Input
// {
//     _id: "5e639b900166df01966c6c07", pw: "Hashed password"
// }

// Output
// {
//     success: Boolean,
//     msg: "" or "Requested item not found" or "Wrong password" or error_message
// }

export default async function deleteEventCallback(req, res) {
    let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[POST] (request) deleteEvents from ${client_ip}`);

    let validRequest = await checkIP(client_ip);

    let response = {
        success: false,
        msg: '',
    };

    const req_data = JSON.parse(JSON.stringify(req.body));

    if(!(req_data['_id'] && 'pw' in req_data)) {
        response['success'] = false;
        response['msg'] = 'Error: query should contain "_id" and "pw"';
        return res.send(response);
    }

    if(validRequest) {
        let {success, msg} = await eventController.deleteEventByIDPW(req_data['_id'], req_data['pw']);
        response['success'] = success;
        response['msg'] = msg;
    }

    return res.send(response);
};