const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || 'dev';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>TechFlow App</title></head>
    <body style="font-family:sans-serif;text-align:center;padding-top:80px;
                 background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;">
      <h1>🚀 TechFlow App</h1>
      <p>자체 구축 GitLab CI/CD로 EC2에 자동 배포되었습니다!</p>
      <p>배포 버전: <b>${APP_VERSION}</b></p>
    </body></html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', version: APP_VERSION });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT} (version=${APP_VERSION})`));
}
module.exports = app;