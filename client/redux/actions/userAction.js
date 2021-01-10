import actionTypes from '../actionTypes';

const init_users = (users) => {
    return {
        type: actionTypes.INIT_USER,
        payload: users
    }
};

export {init_users}
