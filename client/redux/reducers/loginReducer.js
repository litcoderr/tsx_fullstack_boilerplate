import actionTypes from '../actionTypes';

const loginReducer = (state={isLogged: false}, action) => {
    switch(action.type){
        case actionTypes.LOGIN: {
            // TODO Implement Login
            state.isLogged = true;
            return state;
        }
        case actionTypes.LOGOUT: {
            // TODO Implement Logout
            state.isLogged = false;
            return state;
        }
        default: {
            return state;
        }
    }
};

export default loginReducer;
