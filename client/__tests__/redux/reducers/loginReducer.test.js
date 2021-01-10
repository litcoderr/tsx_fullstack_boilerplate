import {login, logout} from "../../../redux/actions/loginAction";
import loginReducer from "../../../redux/reducers/loginReducer";

describe('Login Reducer Test', ()=>{
    it('Should Return Initial State', ()=>{
        expect(loginReducer(undefined, {})).toEqual({
            isLogged: false
        });
    });

    it('Should handle LOGIN action', ()=>{
        expect(loginReducer({
            isLogged: false
        }, login())).toEqual({
            isLogged: true
        });
    });

    it('Should handle LOGOUT action', ()=>{
        expect(loginReducer({
            isLogged: true
        }, logout())).toEqual({
            isLogged: false
        });
    })
});