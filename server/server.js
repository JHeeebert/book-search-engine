// Import dependencies
const express = require('express');
const path = require('path');
// Import ApolloServer, Middleware, typeDefs and resolvers
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
// import connection to database and create a new Apollo server
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

// Create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// Apply our middleware to the apollo server
server.applyMiddleware({ app });
// Tells the app to use express.json and express.urlencoded to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
const _dirname = path.dirname("");
const pathToFile = path.join(_dirname, '../client/build');
app.use(express.static(pathToFile));
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// wildcard GET route for the server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// Start the server once the database connection is open
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
