import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// Create an HTTP link for the Apollo Client
const httpLink = createHttpLink({
  uri: "/graphql", // GraphQL endpoint
});
// Set the authorization header for Apollo Client
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(), // Initialize the cache
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar /> {/* Navbar component */}
          <Routes>
            <Route path="/" element={<SearchBooks />} />{" "}
            {/* Route for searching books */}
            <Route path="/saved" element={<SavedBooks />} />{" "}
            {/* Route for saved books */}
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
