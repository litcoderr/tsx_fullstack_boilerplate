import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import {TestButtonAppBar} from '../../Components/ButtonAppBar'
import Button from '@material-ui/core/Button';

describe('Components/ButtonAppBar.js', () => {
    let shallow;

    beforeAll(() => {
        shallow = createShallow({dive : true});
    });

    it('<AppBar/> Exists', () => {
        const app  = shallow(<TestButtonAppBar loginState={{isLogged: false}} userState={[]}/>);
        expect(app.exists()).toBeTruthy();
    });

    it('AddUser Button Test', () => {
        const app  = shallow(<TestButtonAppBar loginState={{isLogged: false}} userState={[]}/>);
        const button = app.find(Button).at(1);
        button.simulate('click', { preventDefault() {} });
        expect(app.state().dialogOpen).toBeTruthy();
    });
});