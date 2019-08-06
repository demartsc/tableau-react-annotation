import React from 'react';
import ReactDOM from 'react-dom';
import Extension from './Extension';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Extension />, div);
  ReactDOM.unmountComponentAtNode(div);
});
