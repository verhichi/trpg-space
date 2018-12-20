import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/stores/store';

import './styles/normalize.css';
import './styles/styles.scss';

import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </ Provider>,
  document.getElementById('root')
);
