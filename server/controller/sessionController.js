// Controls Session
import {v4 as uuidv4} from 'uuid'
import url from 'url'
import urls from '../url_list'
import { Event } from "./databaseController";

class SessionController {
    constructor(){}
    
    async generate_new_session(){
        let success = true;
        let unique_session_id = await uuidv4();
        
        // Check if exists
        let exist = await Event.exists({session_id: unique_session_id});
        if (exist) {
            console.log(`UUID colision: ${unique_session_id}`);
            return await this.generate_new_session();
        }

        let session_url = url.resolve(urls.newSession, '?session_id='.concat(unique_session_id));
        return [success, session_url]
    }
}

export default SessionController