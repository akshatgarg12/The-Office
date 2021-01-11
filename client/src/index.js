import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import UserContextProvider from './context/UserContextProvider';
import Navbar from './components/templates/navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client';
import client from './config/graphql'

ReactDOM.render(
  <ApolloProvider client={client}>
  <Router>
    <UserContextProvider>
        <Navbar />
        <App />
    </UserContextProvider>
  </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
