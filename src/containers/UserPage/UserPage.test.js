import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserPage from './UserPage';
import { Route } from 'react-router-dom'

configure({ adapter: new Adapter });

describe('<UserPage />', () => {
    it('should have 4 <Route /> elements', () => {
        const wrapper = shallow(<UserPage />);
        expect(wrapper.find(<Route />).toHaveLength(4));
    })

})