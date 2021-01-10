import actionTypes from '../../../redux/actionTypes';
import {init_users} from "../../../redux/actions/userAction";

describe('UserAction Test', ()=>{
    it('Should return Init_users action', ()=>{
        let users = [
            {
                name: 'Sunghwan',
                id: '00001'
            },
            {
                name: 'Youngchae',
                id: '00002'
            }
        ];
        let expectedAction = {
            type: actionTypes.INIT_USER,
            payload: users
        };
        expect(init_users(users)).toEqual(expectedAction);
    });
});