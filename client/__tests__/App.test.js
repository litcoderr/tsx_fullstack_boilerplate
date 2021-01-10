import React from 'react';
import App from '../App';
import { createMount } from '@material-ui/core/test-utils';
import Welcome from '../Routes/Welcome'

describe('App.js', () => {
    let mount;

    beforeAll(() => {
        mount = createMount();
    });
    afterAll(() => {
        mount.cleanUp();
    });

    it('Renders the Welcome Screen', () => {
        const app  = mount(<App/>);
        expect(app.find(Welcome).length).toBe(1);
    });
});
