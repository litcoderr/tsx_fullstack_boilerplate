import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import TimeTableCell from '../../../Components/TimeTable/TimeTableCell';

describe('Components/TimeTableCell.js', () => {
    let shallow;

    beforeAll(() => {
      shallow = createShallow();
    });

    it('<TimeTableCell/> Renders', () => {
        const emptyCell  = shallow(<TimeTableCell dataid={0}/>);
        const dataCell = shallow(<TimeTableCell dataid={1}/>);
    })
});