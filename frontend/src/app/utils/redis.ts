// lib/redis.ts
import Redis from 'ioredis';

// Create Redis client with connection pooling
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  // retryDelayOnFailover: 100,
  // maxRetriesPerRequest: 3,
  // lazyConnect: true,
});

// Handle connection events
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redis;