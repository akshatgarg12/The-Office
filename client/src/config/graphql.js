import { ApolloClient, InMemoryCache } from "@apollo/client";
import { URL } from "../constants";

const client = new ApolloClient({
  uri: `${URL.use}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
