import React from "react";
import ReactDOM from "react-dom";
// root component
import App from "./App";
// styling css files
import "./style.css";
import "semantic-ui-css/semantic.min.css";
// contexts
import UserContextProvider from "./context/UserContextProvider";
// graphQL
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
// router
import { BrowserRouter as Router } from "react-router-dom";
// templates
import Navbar from "./components/templates/navbar";


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <UserContextProvider>
        <Navbar />
        <App />
      </UserContextProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
