import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import MainTimeTable from './Routes/MainTimeTable'
import EditPage from './Routes/EditTable'
import Welcome from './Routes/Welcome'
import url from 'url'

import rootReducer from "./redux/reducers/rootReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";

let root_url = 'http://localhost:3000';
let api_url = {
    newSession: url.resolve(root_url, 'newSession'),
    getEvents: url.resolve(root_url, 'getEvents')
};
let routes = [
    {
        path: '/', component: Welcome
    },
    {
        path: '/timetable', component: MainTimeTable
    },
    {
        path: '/edit', component: EditPage
    }
];

const store = createStore(rootReducer);

function App() {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {routes.map((route, idx)=>(
                        <Route exact key={idx} {...route}/>
                    ))}
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
export {api_url, store}
