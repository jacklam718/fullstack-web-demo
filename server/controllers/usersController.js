const express = require('express');

class UsersController {
  constructor(userService) {
    this.userService = userService;
  }

  getUsers = async (_, res) => {
    let users = res.cache.get('users');
    // fetch users & set cache if users does not exist on cache
    if (!users) {
      users = await this.userService.getUsers();
      res.cache.set('users', users);
    }
    res.json({ users });
  }

  deleteUser = async (req, res) => {
    const users = res.cache.get('users') || [];
    const index = users.findIndex(user => user.id === req.params.id);
    // return 404 - can't find the user by id
    if (index === -1) {
      res.status(404).send('Not found');
      return;
    }
    // filter out the target element
    const newUsers = users.slice(0, index).concat(users.slice(index + 1));
    // update cache
    res.cache.set('users', newUsers);
    res.json({ id: req.params.id, deleted: true });
  }

  getRouter() {
    return express.Router()
      .get('/', this.getUsers)
      .delete('/:id', this.deleteUser);
  }
}

module.exports = UsersController;