import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import Root from './Root';
import { setAuthTokenHeader } from './utils/API';

const authToken: string | null = localStorage.getItem('token');

if (authToken) {
  setAuthTokenHeader(authToken);
}

ReactDOM.render(<Root />, document.getElementById('root'));
