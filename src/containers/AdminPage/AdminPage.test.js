import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminPage from './AdminPage';
import { Route } from 'react-router-dom'

configure({ adapter: new Adapter });

describe('<AdminPage />', () => {
    it('should have 4 <Route /> elements', () => {
        const wrapper = shallow(<AdminPage />);
        expect(wrapper.find(<Route />).toHaveLength(4));
    })

})