import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { Route } from 'react-router-dom'

configure({ adapter: new Adapter });

describe('<App />', () => {
    
    it('renders without crashing', () => {
        shallow(<App />);
      });

    it('should have 2 <Route /> elements if not athenticated', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(<Route />).toHaveLength(2));
    })

})