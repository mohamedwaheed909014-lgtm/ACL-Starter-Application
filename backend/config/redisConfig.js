const { createClient } = require("redis");
require("dotenv");

const redisClient = createClient({
  username: "default",
  password: "xKee8PudjZR52C2Eb15uFV1WVrcvYja0",
  socket: {
    host: "redis-12629.crce177.me-south-1-1.ec2.redns.redis-cloud.com",
    port: 12629,
  },
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log("Successfully connected to Redis");
    } catch (error) {
      console.log("Could not connect to Redis: ", error);
      process.exit(1);
    }
  }
}

connectRedis();

redisClient.on("error", (err) => console.log("Redis Client Error", err));
module.exports = redisClient;
