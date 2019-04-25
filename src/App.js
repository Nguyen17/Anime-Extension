import React, { Component } from "react";
import AnimeList from "./components/AnimeList";
/// Integration with Graphql and Appollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AnimeList />
      </ApolloProvider>
    );
  }
}

export default App;
