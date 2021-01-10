import {init_users} from "../../../redux/actions/userAction";
import userReducer from "../../../redux/reducers/userReducer";

describe('userReducer Test', ()=>{
    it('Should Return Initial State', ()=>{
        expect(userReducer(undefined, {})).toEqual([]);
    });
    it('Should handle INIT_USER action', ()=>{
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
        expect(userReducer(undefined, init_users(users))).toEqual([
            {
                name: 'Sunghwan',
                id: '00001'
            },
            {
                name: 'Youngchae',
                id: '00002'
            }
        ]);
    })
});
