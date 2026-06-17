const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'redis'}:6379`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected successfully'));

(async () => {
  await redisClient.connect();
})();

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend', node: '${process.env.NODE_NAME}' });
});

app.get('/api/users', async (req, res) => {
  try {
    const cacheKey = 'users:all';

    // Redis에서 'users:all' 키로 저장된 데이터가 있는지 확인
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      console.log('Cache Hit! 데이터가 Redis에 존재합니다.');
      // Redis에는 문자열로 저장되므로 JSON으로 변환하여 반환
      return res.json(JSON.parse(cachedUsers));
    }

    // 캐시에 데이터가 없으면 (Cache Miss)
    console.log('Cache Miss! DB(Mock)에서 데이터를 가져온 뒤 캐싱합니다.');
    
    // Redis에 데이터를 문자열(JSON.stringify)로 저장 (60초 동안 유효하도록 설정)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(mockUsers));

    // 결과 반환
    res.json(mockUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});
