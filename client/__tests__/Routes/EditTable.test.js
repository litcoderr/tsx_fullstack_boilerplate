import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import {EditPage} from "../../Routes/EditTable";

describe('Routes/MainTimeTable.js', () => {
    let shallow;
    let location = {search: '?session_id=123123123'};
    let history = {push: jest.fn()};

    beforeAll(() => {
        shallow = createShallow();
    });

    it('Renders the MainTimeTable', () => {
        const app  = shallow(<EditPage
            loginState={{isLogged:false}}
            location={location}
            history={history}
        />);
    })
});
