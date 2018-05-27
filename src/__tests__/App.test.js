import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../App';

describe('On load', () => {

  it('renders without crashing', () => {
    expect(shallow(<App />).contains(<h1 className="App-title">Bowling!</h1>)).toBe(true);
  });
})
