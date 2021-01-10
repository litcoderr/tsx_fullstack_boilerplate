import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import CustomHeader from '../../Components/CustomHeader'

describe('Components/CustomHeader.js', () => {
    let shallow;

    beforeAll(() => {
      shallow = createShallow();
    });
    
    it('<Typography/> Exists', () => {
        const app  = shallow(<CustomHeader/>);
        expect(app.exists(Typography)).toBeTruthy();
    })
});