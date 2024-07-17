const Redis = require('ioredis');

const redis = new Redis({});

redis.connect(() => console.log('Redis connected'));

module.exports = redis;
