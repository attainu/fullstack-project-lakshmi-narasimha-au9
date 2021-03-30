import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import Routes from './Pages/Routes'
import Store from './Store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

