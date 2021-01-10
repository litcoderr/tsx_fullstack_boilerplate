import {login, logout} from "../../../redux/actions/loginAction";
import actionTypes from "../../../redux/actionTypes";

describe('Login Action Test', ()=>{
    it('Should return login action', ()=>{
        let user_id = '123123123';
        let expectedAction = {
            type: actionTypes.LOGIN,
            payload: {
                user_id: user_id,
            }
        };
        expect(login(user_id)).toEqual(expectedAction);
    });
    it('Should return logout action', ()=>{
        let expectedAction = {
            type: actionTypes.LOGOUT,
            payload: {}
        };
        expect(logout()).toEqual(expectedAction);
    });
});