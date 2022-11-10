import React from 'react';
import { shallow } from 'enzyme';
import UseRunInWorker from '../src/index';
import '../src/main.scss';

it('renders', () => {
  const wrapper = shallow(<UseRunInWorker />);
  expect(wrapper.find('.UseRunInWorker').length).toBe(1);
});
