import { ApolloClient, InMemoryCache } from '@apollo/client';
import {URL} from '../constants'
console.log(URL)
const client = new ApolloClient({
  uri: `${URL.use}/graphql`,
  cache: new InMemoryCache()
});

export default client;