import actionTypes from '../actionTypes'

const login = (user_id) => {
    return {
        type: actionTypes.LOGIN,
        payload: {
            user_id: user_id,
        }
    }
};

const logout = () => {
    return {
        type: actionTypes.LOGOUT,
        payload: {}
    }
};

export {login, logout}
