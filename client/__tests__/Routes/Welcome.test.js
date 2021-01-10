import React from 'react';
import Welcome from '../../Routes/Welcome'
import { createShallow } from '@material-ui/core/test-utils';

describe('Routes/Welcome.js', () => {
    let shallow;

    beforeAll(() => {
      shallow = createShallow();
    });

    it('Renders the Welcome', () => {
        const app  = shallow(<Welcome/>);
    })
});