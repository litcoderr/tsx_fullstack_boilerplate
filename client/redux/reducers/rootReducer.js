import loginReducer from "./loginReducer";
import userReducer from './userReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loginState: loginReducer,
    userState: userReducer
});

export default rootReducer;
