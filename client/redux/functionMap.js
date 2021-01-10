import {login, logout} from './actions/loginAction';
import {init_users} from "./actions/userAction";

const mapStatetoProps = (state) => {
    return {
        loginState: state.loginState,
        userState: state.userState
    }
};
const mapDispatchtoProps = (dispatch) => {
    return {
        login: () => dispatch(login()),
        logout: () => dispatch(logout()),
        init_users: (users) => dispatch(init_users(users)) // users: list of user objet {name, id}
    }
};

export {mapStatetoProps, mapDispatchtoProps}
