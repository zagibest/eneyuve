import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://digital.num.edu.mn:4002/graphql",
  cache: new InMemoryCache(),
});

export default client;
