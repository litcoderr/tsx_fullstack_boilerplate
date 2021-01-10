import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MainTimeTable from '../../Routes/MainTimeTable'

describe('Routes/MainTimeTable.js', () => {
    let shallow;

    beforeAll(() => {
      shallow = createShallow();
    });

    it('Renders the MainTimeTable', () => {
        const app  = shallow(<MainTimeTable/>);
    })
});