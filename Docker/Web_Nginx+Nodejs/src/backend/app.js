const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'redis-persist'}:6379`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend', node: process.env.NODE_NAME || '${process.env.NODE_NAME}' });
});

// 개별 user:* 키들을 조합하여 유저 목록을 반환하는 API
app.get('/api/users', async (req, res) => {
  try {
    // 1. Redis에서 "user:*:name" 패턴과 일치하는 모든 키를 찾아옵니다.
    // 예: ["user:1:name", "user:2:name"]
    const nameKeys = await redisClient.keys('user:*:name');

    if (nameKeys.length === 0) {
      console.log('⚠️ Redis에 유저 정보(user:*:name)가 없습니다.');
      return res.json([]);
    }

    const users = [];

    // 2. 찾아온 키들을 돌면서 id를 추출하고, 각각의 name과 email을 조회합니다.
    for (const nameKey of nameKeys) {
      // "user:1:name" 에서 숫자 "1"만 추출 (콜론 기준 쪼개기)
      const userId = nameKey.split(':')[1]; 
      
      // 해당 유저의 email 키 생성
      const emailKey = `user:${userId}:email`;

      // Redis에서 각 키의 실제 값을 가져옵니다.
      const name = await redisClient.get(nameKey);
      const email = await redisClient.get(emailKey);

      // 데이터 조립
      users.push({
        id: parseInt(userId, 10),
        name: name || null,    // 데이터가 없으면 null 처리
        email: email || null
      });
    }

    // ID 순으로 깔끔하게 정렬 (선택 사항)
    users.sort((a, b) => a.id - b.id);

    console.log(`🎯 Redis에서 ${users.length}명의 유저 데이터를 조합했습니다.`);
    res.json(users);

  } catch (error) {
    console.error('API 에러 발생:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 개별 product:* Hash 데이터를 조회하여 상품 목록을 반환하는 API
app.get('/api/products', async (req, res) => {
  try {
    // 1. Redis에서 "product:*" 패턴과 일치하는 모든 키를 찾아옵니다.
    // keys() 결과 예시: ["product:1", "product:2"]
    const productKeys = await redisClient.keys('product:*');

    if (productKeys.length === 0) {
      console.log('⚠️ Redis에 상품 정보(product:*)가 없습니다.');
      return res.json([]);
    }

    const products = [];

    // 2. 찾아온 상품 키들을 돌면서 HGETALL 명령어로 데이터를 가져옵니다.
    for (const key of productKeys) {
      // "product:1" 에서 숫자 "1"만 추출
      const productId = key.split(':')[1];

      // Redis v4 클라이언트에서는 hGetAll 사용 시 결과가 { name: 'Laptop', price: '1200', stock: '50' } 형태의 객체로 반환됩니다.
      const productHash = await redisClient.hGetAll(key);

      // 만약 껍데기만 있고 데이터가 비어있다면 패스
      if (!productHash || Object.keys(productHash).length === 0) continue;

      // 데이터 조립 (숫자형태는 숫자로 변환해주는 것이 좋습니다)
      products.push({
        id: parseInt(productId, 10),
        name: productHash.name || null,
        price: productHash.price ? parseInt(productHash.price, 10) : 0,
        stock: productHash.stock ? parseInt(productHash.stock, 10) : 0
      });
    }

    // 상품 ID 순으로 정렬
    products.sort((a, b) => a.id - b.id);

    console.log(`🎯 Redis에서 ${products.length}개의 상품 데이터를 조회했습니다.`);
    res.json(products);

  } catch (error) {
    console.error('상품 API 에러 발생:', error);
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
