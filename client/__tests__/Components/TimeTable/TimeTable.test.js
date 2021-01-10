import React from 'react';
import {TimeTable} from '../../../Components/TimeTable/TimeTable';
import {shallow, mount} from 'enzyme';
import ButtonAppBar from "../../../Components/ButtonAppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

describe('Components/TimeTable.js', () => {
    let wrapper;

    beforeAll(() => {
        let search = {search: '?session_id=123123123'};
        let history = {listen: jest.fn()};
        wrapper = shallow(<TimeTable location={search} history={history}/>);
    });

    it('prev button click test', () => {
        const btn = wrapper.find(".prev-button");
        btn.simulate('click', { preventDefault() {} })
    });

    it('next button click test', () => {
        const btn = wrapper.find(".next-button");
        btn.simulate('click', { preventDefault() {} })
    })
});