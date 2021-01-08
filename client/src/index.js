import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import UserContextProvider from './context/UserContextProvider';
import Navbar from './components/templates/navbar';

ReactDOM.render(
  <UserContextProvider>
      <Navbar />
      <App />
  </UserContextProvider>,
  document.getElementById('root')
);
