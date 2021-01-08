import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import UserContextProvider from './context/UserContextProvider';

ReactDOM.render(
  <UserContextProvider>
      <App />
  </UserContextProvider>,
  document.getElementById('root')
);
