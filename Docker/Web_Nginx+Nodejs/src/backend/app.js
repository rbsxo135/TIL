const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'redis-persist'}:6379`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const cacheKey = 'users:all';

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend', node: process.env.NODE_NAME || 'backend1' });
});

// 오직 Redis 데이터만 조회하는 유저 API
app.get('/api/users', async (req, res) => {
  try {
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      console.log('🎯 Redis에서 유저 데이터를 가져왔습니다.');
      return res.json(JSON.parse(cachedUsers));
    }

    // Redis에 데이터가 없으면 빈 배열 반환
    console.log('⚠️ Redis에 users:all 키가 없습니다.');
    res.json([]);
  } catch (error) {
    console.error('API 에러 발생:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function startServer() {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('서버 구동 실패:', error);
    process.exit(1);
  }
}

startServer();
