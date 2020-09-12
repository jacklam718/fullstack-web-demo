class Memcache {
  store = {}

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    this.store[key] = value;
  }
}

const memcache = new Memcache();

module.exports = async (_, res, next) => {
  res.cache = memcache;
  await next();
}