import SessionController from '../controller/sessionController'
import checkIP from "../controller/validateRequest";
let sessionController = new SessionController();

export default async function newSessionCallback(req, res){
    let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[POST] (request) newSession from ${client_ip}`);

    let validRequest = await checkIP(client_ip);
    let response = {};
    if(validRequest){
        let [success, url] = await sessionController.generate_new_session();
        response = {
            success: success,
            url: url
        }
    }else{
        response = {
            success: false,
            url: ''
        };
        console.log('invalid request')
    }

    return res.send(response)
};