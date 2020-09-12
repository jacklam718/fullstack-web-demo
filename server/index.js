const express = require('express');
const requestCacheMiddleware = require('./middlewares/requestCache');
const UserService = require('./services/userService');
const UsersController = require('./controllers/usersController');

const app = express();
const port = 8080;

// config response headers
app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, DELETE');
  next();
})

// middlewares
app.use(requestCacheMiddleware);

// services
const userService = new UserService();

// routers
const usersController = new UsersController(userService);
app.use('/api/users', usersController.getRouter());

// start listening
app.listen(port, '0.0.0.0', () => {
  console.log(`Users api listen on port ${port}`);
});
