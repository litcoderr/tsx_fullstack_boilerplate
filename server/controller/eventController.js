import { Event } from './databaseController'

class EventController {
    constructor() {
    }

    async getAllEventsBySessionID(session_id) {
        let response = {
            events: null,
            success: false,
            msg: '',
        };

        try {
            // -pw to exclude password
            response['events'] = await Event.find({session_id: session_id}).select('-pw');
            response['success'] = true;
            response['msg'] = '';
        } catch (err) {
            console.error(err);
            response['events'] = null;
            response['success'] = false;
            response['msg'] = 'get events from database failed. Check for server log.';
        }

        return response;
    }

    async saveEvents(event_dict_array) {
        try {
            let ret = await Event.create(event_dict_array);
            return {
                success: true,
                msg: '',
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                msg: 'Saving events to database failed. Check for server log.'
            }
        }
    }

    async deleteEventByIDPW(_id, pw) {
        if(_id === undefined) {
            console.error(`deleteEventByIDPW: _id is undefined.`);
        }

        let ret = await Event.find({ _id: _id });
        if(ret.length === 0) {
            return { success: false, msg: "Requested item not found"}
        }
        if(ret.length > 2) {
            console.error(`deleteEventByIDPW: Found more than 1 items. id: ${_id}, length: ${ret.length}`);
        }
        if(ret[0]['id'] !== _id) {
            console.error(`Error: ret[0]['id'] !== _id, ${ret[0]['id']} !== ${_id}`);
        }

        if(ret[0]['pw'] === undefined || ret[0]['pw'] === pw)
        {
            try{
                await ret[0].remove();
                return {
                    success: true,
                    msg: '',
                }
            } catch (err) {
                console.error(`Deleting item id: ${id} failed. ${err}`);
                return {
                    success: false,
                    msg: `Deleting item failed. Check for server log.`,
                }
            }
        } else {
            return {
                success: false,
                msg: "Wrong password",
            }
        }
    }

    // async deleteEvents(event_dict_array) {
    //     try {
    //         let ret = await Event.find(event_dict_array).remove();
    //         return {
    //             success: true,
    //             msg: `Deleted ${event_dict_array.length} items.`,
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         console.error(`Deleting items failed for ${event_dict_array}`);
    //         return {
    //             success: false,
    //             msg: `Deleting items failed. Check for server log.`,
    //         }
    //     }
    // }
}

export default EventController