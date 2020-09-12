const axios = require('axios');

class UserService {
  // initialize requester
  axiosInstance = axios.create({
    baseURL: 'https://dummyapi.io/data/api/',
    headers: {
      'App-id': '5f5a3f6ded242c882955ff80',
    },
  });

  async getUsers({ limit = 50 } = {}) {
    const { data: { data: users } } = await this.axiosInstance.get(`user?limit=${limit}`);
    return users;
  }
}

module.exports = UserService;