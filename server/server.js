// Import dependencies
const express = require('express');
const path = require('path');
// Import ApolloServer, Middleware, typeDefs and resolvers
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
// import connection to database and create a new Apollo server
const db = require('./config/connection');
const routes = require('./routes');
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets from the /public folder in our application if we're in production
const _dirname = path.dirname('');
const pathToFile = path.join(_dirname, '../client/build');
app.use(express.static(pathToFile));

// wildcard GET route for the server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
