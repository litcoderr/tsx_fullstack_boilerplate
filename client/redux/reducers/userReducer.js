import actionTypes from '../actionTypes';

const userReducer = (state=[], action) => {
    // state contains list of users {name, id}
    switch(action.type){
        case actionTypes.INIT_USER: {
            // TODO Implement Init User
            // init state from payload (list of users)
            state = action.payload;
            return state;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
