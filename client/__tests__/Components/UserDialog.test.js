import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import UserDialog from '../../Components/UserDialog'
import ListItem from '@material-ui/core/ListItem';

describe('Components/UserDialog.js', () => {
    let shallow;
    let wrapper;

    let dialogOpen = true;
    let dialogValue = "Initial";

    const handleClose = value => {
        dialogOpen = false;
        dialogValue = value;
    };

    beforeAll(() => {
        shallow = createShallow({dive : true});
    });

    it('<UserDialog/> Exists', () => {
        wrapper  = shallow(<UserDialog selectedValue={dialogValue}
                                       open={dialogOpen}
                                       onClose={handleClose}/>);
        expect(wrapper.exists()).toBeTruthy();
    });

    it('Create User Test', () => {
        const addBtn = wrapper.find('.add-account-btn');
        addBtn.simulate('click');
        expect(wrapper.state().isNewUserOpen).toBeTruthy();

        const signupBtn = wrapper.find('.cancel-btn');
        signupBtn.simulate('click');
        expect(wrapper.state().isNewUserOpen).toBeFalsy();
    });

    it('User Select Test', () => {
        dialogOpen = true;
        const addBtn = wrapper.find(ListItem).at(0);
        expect(dialogOpen).toBeTruthy();
        addBtn.simulate('click');
        expect(dialogOpen).toBeFalsy();
        expect(dialogValue).toBe('Sunghwan');
    });
});