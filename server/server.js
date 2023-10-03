const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// Load environment variables from .env file
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const _dirname = path.dirname("");
const pathToFile = path.join(_dirname, '../client/build');
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Attach authentication middleware
});
server.applyMiddleware({ app });
// Middleware to handle URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the React build folder
app.use(express.static(pathToFile));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// Wildcard GET route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
